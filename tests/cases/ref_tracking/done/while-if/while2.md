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
let /*___4__*/ x = 1;
while (true) {
  /*8~17*/ if ($) {
    /*11~15*/ $(/*___15__*/ x);
  } /*16~17*/ else {
    break;
  }
}
$(/*___21__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,21       | none           | none
  - r @15      | 4
  - r @21      | 4
