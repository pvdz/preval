# Preval test case

# while9_2.md

> Ref tracking > Done > While-if > While9 2
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  while (true) {
    if ($) {
      $(x); // x=1
    } else {
      $(x); // x=1
      x = 2;
      break;
    }
  }
  break;
}
$(x); // 2, not one (always overwritten before break)
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ while (true) {
    /*11*/ if ($) {
      /*14*/ $(x___18__);
    } /*19*/ else {
      $(x___23__);
      x___27__ = 2;
      break;
    }
  }
  break;
}
$(x___33__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,23       | none           | 27
  - r @18      | 4
  - r @23      | 4
  - w @27      | ########## | 33          | 4              | none
  - r @33      | 27
