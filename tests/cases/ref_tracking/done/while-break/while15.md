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
  }
}
$(x___37__);
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
