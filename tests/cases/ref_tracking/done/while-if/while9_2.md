# Preval test case

# while9_2.md

> Ref tracking > Done > While-if > While9 2
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  while (true) {
    if ($) {
      $(x); // x=1
    } else {
      $(x); // x=1
      x = 2;
      break;
    }
  }
  break;
}
$(x); // 2, not one (always overwritten before break)
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~25*/ if ($) {
    /*11~15*/ $(/*___15__*/ x);
  } /*16~25*/ else {
    $(/*___20__*/ x);
    /*___24__*/ x = 2;
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
  - w @4       | ########## | 15,20       | none           | 24
  - r @15      | 4
  - r @20      | 4
  - w @24      | ########## | 29          | 4              | none
  - r @29      | 24
