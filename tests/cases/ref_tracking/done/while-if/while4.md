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
let /*___4__*/ x = 1;
while (true) {
  /*8~25*/ if ($) {
    /*11~19*/ $(/*___15__*/ x);
    /*___19__*/ x = 2;
  } /*20~25*/ else {
    $(/*___24__*/ x);
    break;
  }
}
$(/*___29__*/ x);
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
