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
let /*___4__*/ x = 1;
while (/*___7__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*8~34*/ if ($) {
    /*11~32*/ if ($1) {
      /*14~23*/ $(/*___18__*/ x);
      /*___22__*/ x = 5;
      break;
    } /*24~32*/ else {
      /*___28__*/ x = 4;
      /*___32__*/ x = 3;
    }
  } /*33~34*/ else {
    break;
  }
}
$(/*___38__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,38       | none           | 22,28
  - r @18      | 4,32
  - w @22      | ########## | 38          | 4,32           | none
  - w @28      | ########## | not read    | 4,32           | 32
  - w @32      | ########## | 18,38       | 28             | 22,28
  - r @38      | 4,22,32
