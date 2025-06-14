# Preval test case

# while2.md

> Ref tracking > Done > While-break > While2
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
    x = 2;
    break;
  } else {
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
      /*18~23*/ /*___22__*/ x = 2;
      break;
    } /*24~24*/ else {
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
  - w @4       | ########## | 15,30       | none           | 22
  - r @15      | 4
  - w @22      | ########## | 30          | 4              | none
  - r @30      | 4,22
