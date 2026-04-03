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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~17*/ /* stmt(9): */ if ($) {
    /*11~15*/ /* stmt(12): */ $(/*___15__*/ x);
  } /*16~17*/ else {
    /* stmt(17): */ break;
  }
}
/* stmt(18): */ $(/*___21__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,21       | none           | none
  - r @15      | 4
  - r @21      | 4
