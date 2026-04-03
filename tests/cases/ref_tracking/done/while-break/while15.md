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
while ($LOOP_NO_UNROLLS_LEFT) {
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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (/*___7__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*8~33*/ /* stmt(9): */ if ($) {
    /*11~32*/ /* stmt(12): */ if ($1) {
      /*14~23*/ /* stmt(15): */ $(/*___18__*/ x);
      /* stmt(19): */ /*___22__*/ x = 5;
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
  - w @4       | ########## | 18          | none           | 22,28
  - r @18      | 4,32
  - w @22      | ########## | 37          | 4,32           | none
  - w @28      | ########## | not read    | 4,32           | 32
  - w @32      | ########## | 18          | 28             | 22,28
  - r @37      | 22
