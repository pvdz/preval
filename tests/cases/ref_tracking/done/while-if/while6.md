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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~25*/ /* stmt(9): */ if ($) {
    /*11~16*/ /* stmt(12): */ $(/*___15__*/ x);
    /* stmt(16): */ break;
  } /*17~25*/ else {
    /* stmt(18): */ $(/*___21__*/ x);
    /* stmt(22): */ /*___25__*/ x = 2;
  }
}
/* stmt(26): */ $(/*___29__*/ x);
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
