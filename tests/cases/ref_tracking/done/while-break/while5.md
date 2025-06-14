# Preval test case

# while5.md

> Ref tracking > Done > While-break > While5
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x);
  if ($) {
    break;
  } else {
    x = 2;
  }
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~26*/ if ($) {
    /*11~24*/ $(/*___15__*/ x);
    if ($) {
      /*18~19*/ break;
    } /*20~24*/ else {
      /*___24__*/ x = 2;
    }
  } /*25~26*/ else {
    break;
  }
}
$(/*___30__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,30       | none           | 24
  - r @15      | 4,24
  - w @24      | ########## | 15,30       | 4,24           | 24
  - r @30      | 4,24
