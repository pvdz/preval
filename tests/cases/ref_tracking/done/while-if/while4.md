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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~25*/ /* stmt(9): */ if ($) {
    /*11~19*/ /* stmt(12): */ $(/*___15__*/ x);
    /* stmt(16): */ /*___19__*/ x = 2;
  } /*20~25*/ else {
    /* stmt(21): */ $(/*___24__*/ x);
    /* stmt(25): */ break;
  }
}
/* stmt(26): */ $(/*___29__*/ x);
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
