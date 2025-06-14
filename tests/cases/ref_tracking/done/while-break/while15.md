# Preval test case

# while15.md

> Ref tracking > Done > While-break > While15
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
      $(x);   // x=1 3
      x = 5;  // overwrites x=1 3
      break;
    } else {
      x = 4;  // reachable, unobservable, overwrites x=1 3
    }
    x = 3;    // overwrites x=4 (not 1, not 3), unobserved
  }
}
$(x);         // x=5
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (/*___7__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*8~33*/ if ($) {
    /*11~32*/ if ($1) {
      /*14~23*/ $(/*___18__*/ x);
      /*___22__*/ x = 5;
      break;
    } /*24~32*/ else {
      /*___28__*/ x = 4;
      /*___32__*/ x = 3;
    }
  } /*33~33*/ else {
  }
}
$(/*___37__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18          | none           | 22,28
  - r @18      | 4,32
  - w @22      | ########## | 37          | 4,32           | none
  - w @28      | ########## | not read    | 4,32           | 32
  - w @32      | ########## | 18          | 28             | 22,28
  - r @37      | 22
