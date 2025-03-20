# Preval test case

# while2.md

> Ref tracking > Done > While-if > While2
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($) {
    $(x);
  } else {
    break;
  }
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $(x___15__);
  } /*16*/ else {
    break;
  }
}
$(x___21__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,21       | none           | none
  - r @15      | 4
  - r @21      | 4
