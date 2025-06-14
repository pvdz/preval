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
    $(x); // x=1 2
    break;
  } else {
    $(x); // x=1 2
    x = 2;
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
    /*11~16*/ $(/*___15__*/ x);
    break;
  } /*17~25*/ else {
    $(/*___21__*/ x);
    /*___25__*/ x = 2;
  }
}
$(/*___29__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,21,29    | none           | 25
  - r @15      | 4,25
  - r @21      | 4,25
  - w @25      | ########## | 15,21,29    | 4,25           | 25
  - r @29      | 4,25
