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
      $implicitThrow___54__ = true;
      $finalCatchArg___58__ = $finalImplicit___57__;
    }
  }
  $(x___62__);
  x___66__ = 4;
  if ($implicitThrow___68__) {
    /*69*/ throw $finalCatchArg___71__;
  } /*72*/ else {
    if ($finalStep___74__) {
      /*75*/ break here___77__;
    } /*78*/ else {
      $(x___82__);
      x___86__ = 5;
    }
  }
}
$(x___90__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,90       | none           | 16
  - r @12      | 4
  - w @16      | ########## | 37,62       | 4              | 41,66
  - r @37      | 16
  - w @41      | ########## | 62          | 16             | 66
  - r @62      | 16,41
  - w @66      | ########## | 82,90       | 16,41          | 86
  - r @82      | 66
  - w @86      | ########## | 90          | 66             | none
  - r @90      | 4,66,86

$implicitThrow:
  - w @19          | ########## | 68          | none           | 54
  - w @54          | ########## | 68          | 19             | none
  - r @68          | 19,54

$finalStep:
  - w @23          | ########## | 74          | none           | 45
  - w @45          | ########## | 74          | 23             | none
  - r @74          | 23,45

$finalCatchArg:
  - w @27          | ########## | 71          | none           | 58
  - w @58          | ########## | 71          | 27             | none
  - r @71          | 27,58
