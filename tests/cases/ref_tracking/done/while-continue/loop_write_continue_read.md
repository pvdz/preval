# Preval test case

# loop_write_continue_read.md

> Ref tracking > Done > While-continue > Loop write continue read
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x, 1);
  if (x < 4) continue;
  $(x, 2);
  break;
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 0;
while (true) {
  /*8*/ x___14__ = x___12__ + 1;
  $(x___18__, 1);
  const tmpIfTest___22__ = x___24__ < 4;
  if (tmpIfTest___27__) {
    /*28*/ continue;
  } /*30*/ else {
    $(x___34__, 2);
    break;
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | 14
  - r @12      | 4,14
  - w @14      | ########## | 18,24,34,12 | 4,14           | 14
  - r @18      | 14
  - r @24      | 14
  - r @34      | 14

tmpIfTest:
  - w @22      | ########## | 27          | none           | none
  - r @27      | 22
