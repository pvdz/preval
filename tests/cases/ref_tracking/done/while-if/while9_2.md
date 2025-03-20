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
  /*8*/ if ($) {
    /*11*/ $(x___15__);
  } /*16*/ else {
    $(x___20__);
    x___24__ = 2;
    break;
  }
}
$(x___29__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,20       | none           | 24
  - r @15      | 4
  - r @20      | 4
  - w @24      | ########## | 29          | 4              | none
  - r @29      | 24
