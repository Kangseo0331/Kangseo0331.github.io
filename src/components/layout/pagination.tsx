interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]
  }

  const buttonStyle =
    'flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm transition-colors'

  return (
    <nav
      aria-label="페이지 이동"
      className="flex items-center justify-center gap-1"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonStyle} text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30`}
      >
        이전
      </button>

      {getPages().map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-9 min-w-9 items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`${buttonStyle} ${
              currentPage === page
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonStyle} text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30`}
      >
        다음
      </button>
    </nav>
  )
}