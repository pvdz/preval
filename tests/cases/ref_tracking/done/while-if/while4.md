# Preval test case

# while4.md

> Ref tracking > Done > While-if > While4
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
    x = 2;
  } else {
    $(x);
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
    x___19__ = 2;
  } /*20*/ else {
    $(x___24__);
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
  - w @19      | ########## | not read    | none           | none
  - r @24      | none (TDZ?)
  - r @29      | 4
