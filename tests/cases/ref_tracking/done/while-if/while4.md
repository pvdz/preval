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
    $(x); // x=1 2
    x = 2;
  } else {
    $(x); // x=1 2
    break;
  }
}
$(x); // x=1 2
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


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,24,29    | none           | 19
  - r @15      | 4,19
  - w @19      | ########## | 15,24,29    | 4,19           | 19
  - r @24      | 4,19
  - r @29      | 4,19
