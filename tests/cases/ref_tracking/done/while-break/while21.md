# Preval test case

# while21.md

> Ref tracking > Done > While-break > While21
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if ($) {
    x = 5;  // overwrites x=1 3 (this step is the key to this test. it is not in the root of the loop and not in the same block as the break)
    if ($1) {
      $(x);   // x=5
      break;
    } else {
      x = 4;  // reachable, unobservable, overwrites x=5
    }
    x = 3;    // overwrites x=4
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
    /*11*/ x___15__ = 5;
    if ($1) {
      /*18*/ $(x___22__);
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

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 37          | none           | 15
  - w @15      | ########## | 22,37       | 4,32           | 28
  - r @22      | 15
  - w @28      | ########## | not read    | 15             | 32
  - w @32      | ########## | 37          | 28             | 15
  - r @37      | 4,15,32
