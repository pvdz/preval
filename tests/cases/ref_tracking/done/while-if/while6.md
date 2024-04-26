# Preval test case

# while6.md

> Ref tracking > Done > While-if > While6
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
    break;
  } else {
    $(x);
    x = 2;
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
    break;
  } /*17*/ else {
    $(x___21__);
    x___25__ = 2;
  }
}
$(x___29__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 29          | none           | none
  - r @15      | none (TDZ?)
  - r @21      | none (TDZ?)
  - w @25      | ########## | not read    | none           | none
  - r @29      | 4
