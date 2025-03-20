# Preval test case

# while17.md

> Ref tracking > Done > While-break > While17
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
      x = 4;
    }
    x = 3;
  } else {
    break;
  }
}
$(x); // x=1 3 5
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
      x___28__ = 4;
      x___32__ = 3;
    }
  } /*33*/ else {
    break;
  }
}
$(x___38__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,38       | none           | 22,28
  - r @18      | 4,32
  - w @22      | ########## | 38          | 4,32           | none
  - w @28      | ########## | not read    | 4,32           | 32
  - w @32      | ########## | 18,38       | 28             | 22,28
  - r @38      | 4,22,32
