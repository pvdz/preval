# Preval test case

# while8.md

> Ref tracking > While-continue > While8
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
    continue;
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
    continue;
  }
}
$(x___29__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,20,29    | none           | 24
  - r @15      | 4
  - r @20      | 4
  - w @24      | ########## | not read    | 4              | none
  - r @29      | 4
