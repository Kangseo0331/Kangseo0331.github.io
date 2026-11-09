---
title: TypeORM에서 DTO 이용해 save() 후 결과 반환 불일치/에러
date: 2026-11-10
category: techblog
tags:
  - dto
  - nestjs
  - trouble_shooting
  - typeorm
description: ""
---
src/book/book.service.ts

```typescript
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  //도서 등록
  async createBook(createBookDto: CreateBookDto) : Promise<BookResponseDto> {
    const newBook = this.bookRepository.create(createBookDto);
    const result = await this.bookRepository.save(newBook);

    return BookResponseDto.from(result);
  }
}
```

src/book/dto/create-book.dto.ts

```
export class CreateBookDto {
    @IsInt()
    @Type(() => Number)
    categoryId: number;

    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    description?: string;
}


export class BookResponseDto {
    bookId: number;
    title: string;
    description: string | null;
    categoryName: string;
    isAvailable: boolean;

    static from(book: Book): BookResponseDto {
        return {
            bookId: book.bookId,
            title: book.title,
            description: book.description,
            categoryName: book.category.name,
            isAvailable: book.isAvailable,
        };
    }
}
```

도서 등록을 위해 postman을 실행하니 다음과 같은 오류가 발생했다.

```
TypeError: Cannot read properties of undefined (reading 'name') 
	at BookResponseDto.from (create-book.dto.ts:39) 
	at BookService.createBook (book.service.ts:36)
```

undefined의 name을 읽으려 했다는 뜻이다.

BookResponseDto.from() 안의 category.name에서 category가 undefined 였기 때문이다.

createBook()에서 처음에는  **저장 직후의 result에는 category 관계가 채워져 있지 않아서**, BookResponseDto.from() 39번째 줄의 category.name이 undefined.name이 되어 문제가 발생한 것이다.

save()는 넘겨준 값만 돌려주고, 관계 엔티티를 DB에서 다시 불러오지 않는다.

관계 엔티티를 다시 불러오도록 relations: { 'category': true } 을 통해 관계를 조회하고, findOneOrFail()을 통해 조회 결과를 가져왔다.

```
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  //도서 등록
  async createBook(createBookDto: CreateBookDto) : Promise<BookResponseDto> {
    const newBook = this.bookRepository.create(createBookDto);
    const saved = await this.bookRepository.save(newBook);

    const result = await this.bookRepository.findOneOrFail({
      where: { bookId: saved.bookId },
      relations: { category: true },
    });

    return BookResponseDto.from(result);
  }
```

#### ① where: { bookId: saved.bookId }

-   SQL의 WHERE book\_id = ? 
-   방금 저장(save)한 엔티티의 PK 값(saved.bookId)을 기준으로 정확히 그 1건을 조회

#### ② relations: { category: true } 

-   SQL의 LEFT JOIN 
-   외래키로 연결된 Category 테이블의 데이터까지 함께 JOIN해서 가져오도록 지시

#### ③ findOneOrFail()
