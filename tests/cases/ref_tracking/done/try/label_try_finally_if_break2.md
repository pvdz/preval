# Preval test case

# label_try_finally_if_break2.md

> Ref tracking > Done > Try > Label try finally if break2
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    $(x);              // x=1
    x = 2;
    try {
      $(x);            // x=2
      x = 3;
      break here;
    } finally {
      $(x);            // x=2 3
      x = 4;
      // Only the break goes through here and then jumps to after the label
    }
    // While unreachable, note that the analysis walks the block, sees it
    // doesn't complete abruptly, and assumes natural code flow would just
    // continue here. I expect that we can DCE this code later... :)
    $(x);              // unreachable (but would be 4 otherwise)
    x = 5;             // unreachable
  }
  $(x);                // x=4
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
here___7__: /*8*/ {
  $(x___15__);
  x___19__ = 2;
  let $implicitThrow___21__ = false;
  let $finalStep___24__ = false;
  let $finalCatchArg___27__ = undefined___28__;
  $finally___30__: /*31*/ {
    try /*33*/ {
      $(x___37__);
      x___41__ = 3;
      $finalStep___45__ = true;
      break $finally___47__;
    } catch ($finalImplicit___49__) /*50*/ {
      $(x___54__);
      x___58__ = 4;
      throw $finalImplicit___60__;
    }
  }
  $(x___64__);
  x___68__ = 4;
  if ($implicitThrow___70__) {
    /*71*/ throw $finalCatchArg___73__;
  } /*74*/ else {
    break here___76__;
  }
}
$(x___80__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15          | none           | 19
  - r @15      | 4
  - w @19      | ########## | 37,54,64    | 4              | 41,58,68
  - r @37      | 19
  - w @41      | ########## | 54,64       | 19             | 58,68
  - r @54      | 19,41
  - w @58      | ########## | not read    | 19,41          | none
  - r @64      | 19,41
  - w @68      | ########## | 80          | 19,41          | none
  - r @80      | 68

$implicitThrow:
  - w @21          | ########## | 70          | none           | none
  - r @70          | 21

$finalStep:
  - w @24          | ########## | not read    | none           | 45
  - w @45          | ########## | not read    | 24             | none

$finalCatchArg:
  - w @27          | ########## | 73          | none           | none
  - r @73          | 27

$finalImplicit:
  - w @49          | ########## | 60          | none           | none
  - r @60          | 49
