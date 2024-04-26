# Preval test case

# while5.md

> Ref tracking > Done > While-if > While5
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
    $(x);
    x = 2;
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
    $(x___20__);
    x___24__ = 2;
    break;
  }
}
$(x___29__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 29          | none           | none
  - r @15      | none (TDZ?)
  - r @20      | none (TDZ?)
  - w @24      | ########## | not read    | none           | none
  - r @29      | 4
