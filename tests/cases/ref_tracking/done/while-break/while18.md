# Preval test case

# while18.md

> Ref tracking > Done > While-break > While18
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if ($) {
    if ($1) {
      $(x); // x=1 3
      x = 5;
      break;
    } else {
    }
    x = 3;
  } else {
    break;
  }
}
$(x); // x=5
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___7__) {
  /*8*/ if ($) {
    /*11*/ if ($1) {
      /*14*/ $(x___18__);
      x___22__ = 5;
      break;
    } /*24*/ else {
      x___28__ = 3;
    }
  } /*29*/ else {
    break;
  }
}
$(x___34__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,34       | none           | 22,28
  - r @18      | 4,28
  - w @22      | ########## | 34          | 4,28           | none
  - w @28      | ########## | 18,34       | 4,28           | 22,28
  - r @34      | 4,22,28
