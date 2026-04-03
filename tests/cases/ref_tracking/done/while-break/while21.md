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
while ($LOOP_NO_UNROLLS_LEFT) {
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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (/*___7__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*8~33*/ /* stmt(9): */ if ($) {
    /*11~32*/ /* stmt(12): */ /*___15__*/ x = 5;
    /* stmt(16): */ if ($1) {
      /*18~23*/ /* stmt(19): */ $(/*___22__*/ x);
      /* stmt(23): */ break;
    } /*24~32*/ else {
      /* stmt(25): */ /*___28__*/ x = 4;
      /* stmt(29): */ /*___32__*/ x = 3;
    }
  } /*33~33*/ else {
  }
}
/* stmt(34): */ $(/*___37__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 15
  - w @15      | ########## | 22,37       | 4,32           | 28
  - r @22      | 15
  - w @28      | ########## | not read    | 15             | 32
  - w @32      | ########## | not read    | 28             | 15
  - r @37      | 15
