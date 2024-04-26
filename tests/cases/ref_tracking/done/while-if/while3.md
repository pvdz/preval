# Preval test case

# while3.md

> Ref tracking > Done > While-if > While3
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x);
  x = 2;
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
    break;
  }
}
$(x___25__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 25          | none           | none
  - r @15      | none (TDZ?)
  - w @19      | ########## | not read    | none           | none
  - r @25      | 4
