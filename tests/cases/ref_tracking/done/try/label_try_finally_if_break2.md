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
  $(x___12__);
  x___16__ = 2;
  let $implicitThrow___19__ = false;
  let $finalStep___23__ = false;
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

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,80       | none           | 16
  - r @12      | 4
  - w @16      | ########## | 37,54,64    | 4              | 41,58,68
  - r @37      | 16
  - w @41      | ########## | 54,64       | 16             | 58,68
  - r @54      | 16,41
  - w @58      | ########## | not read    | 16,41          | none
  - r @64      | 16,41
  - w @68      | ########## | 80          | 16,41          | none
  - r @80      | 4,68

$implicitThrow:
  - w @19          | ########## | 70          | none           | none
  - r @70          | 19

$finalStep:
  - w @23          | ########## | not read    | none           | 45
  - w @45          | ########## | not read    | 23             | none

$finalCatchArg:
  - w @27          | ########## | 73          | none           | none
  - r @73          | 27
