# Preval test case

# while12.md

> Ref tracking > Done > While-continue > While12
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  if ($(false)) {
    x = 3;
    continue;
  } else {
  }
  $(x); // x=1 3
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $continue___13__: /*14*/ {
      const tmpIfTest___17__ = $(false);
      if (tmpIfTest___22__) {
        /*23*/ x___27__ = 3;
        break $continue___29__;
      } /*30*/ else {
        $(x___34__);
      }
    }
  } /*35*/ else {
    break;
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 34          | none           | 27
  - w @27      | ########## | 34          | 4,27           | 27
  - r @34      | 4,27

tmpIfTest:
  - w @17      | ########## | 22          | none           | none
  - r @22      | 17
