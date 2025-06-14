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
let /*___4__*/ x = 1;
/*___7__*/ here: /*8~76*/ {
  $(/*___15__*/ x);
  /*___19__*/ x = 2;
  let /*___21__*/ $implicitThrow = false;
  let /*___24__*/ $finalStep = false;
  let /*___27__*/ $finalCatchArg = /*___28__*/ undefined;
  /*___30__*/ $finally: /*31~60*/ {
    try /*33~47*/ {
      $(/*___37__*/ x);
      /*___41__*/ x = 3;
      /*___45__*/ $finalStep = true;
      break /*___47__*/ $finally;
    } catch (/*___49__*/ $finalImplicit) /*50~60*/ {
      $(/*___54__*/ x);
      /*___58__*/ x = 4;
      throw /*___60__*/ $finalImplicit;
    }
  }
  $(/*___64__*/ x);
  /*___68__*/ x = 4;
  if (/*___70__*/ $implicitThrow) {
    /*71~73*/ throw /*___73__*/ $finalCatchArg;
  } /*74~76*/ else {
    break /*___76__*/ here;
  }
}
$(/*___80__*/ x);
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
