# Preval test case

# try_break_out.md

> Ref tracking > Done > Try-random > Try break out
>
> The challenge here is that the finally breaks outside of the finally
> and therefor changes the continuation, whether there was a break to A
> or not. Even the throw would be picked up and changed. (May need to
> test that explicitly, but ok)

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  A: {
    $(x); // x=1
    x = 2;
    B: {
      try {
        $(x); // x=2
        if (x) { // x=2
          x = 3;
          break A;
        }
        x = 4;
      } finally {
        if ($()) {
          $(x); // x=2 3 4
          // This overrides the original continuation, both the implicit (x=4)
          // and the break to A (x=3) and even the unexpected throw (x=2).
          break B;
        }
        $(x, 'in'); // x=2 3 4
      }
      // (NOT 3: either that breaks to A or to B)
      // (NOT 2: can only happen with an unexpected throw which would
      // either be overridden by the break to B (skips this) and else
      // would still throw after the finally completes)
      // Not sure if I can manage that but I also don't really have a choice 
      $(x, 'post'); // x=4
    }
    $(x); // x=3 4
    x = 5;
  }
  // If try throws immediately, then x=2 and if break overrides, then x=5
  // If try breaks then x=3. Either finally breaks then x=5 or not then x=3
  // If try doesnt break then x=4, then either way x=5, so 4 is not visible
  $(x); // x=3 5
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
A___7__: /*8*/ {
  B___10__: /*11*/ {
    $(x___15__);
    $(x___19__);
    x___23__ = 2;
    let $implicitThrow___26__ = false;
    let $finalStep___30__ = false;
    let $finalCatchArg___34__ = undefined___35__;
    $finally___37__: /*38*/ {
      try /*40*/ {
        $(x___44__);
        if (x___46__) {
          /*47*/ x___51__ = 3;
          $finalStep___55__ = true;
          break $finally___57__;
        } /*58*/ else {
          x___62__ = 4;
        }
      } catch ($finalImplicit___64__) /*65*/ {
        $implicitThrow___69__ = true;
        $finalCatchArg___73__ = $finalImplicit___72__;
      }
    }
    const tmpIfTest___76__ = $();
    if (tmpIfTest___80__) {
      /*81*/ $(x___85__);
      break B___87__;
    } /*88*/ else {
      $(x___92__, `in`);
      if ($implicitThrow___96__) {
        /*97*/ throw $finalCatchArg___99__;
      } /*100*/ else {
        if ($finalStep___102__) {
          /*103*/ break A___105__;
        } /*106*/ else {
          $(x___110__, `post`);
        }
      }
    }
  }
  $(x___116__);
  x___120__ = 5;
}
$(x___124__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,19,116,124 | none           | 23,120
  - r @15      | 4
  - r @19      | 4
  - w @23      | ########## | 44,46,85,92,110,116,124 | 4              | 51,62,120
  - r @44      | 23
  - r @46      | 23
  - w @51      | ########## | 85,92,110,116,124 | 23             | 120
  - w @62      | ########## | 85,92,110,116,124 | 23             | 120
  - r @85      | 23,51,62
  - r @92      | 23,51,62
  - r @110     | 23,51,62
  - r @116     | 4,23,51,62
  - w @120     | ########## | 124         | 4,23,51,62     | none
  - r @124     | 4,23,51,62,120

$implicitThrow:
  - w @26          | ########## | 96          | none           | 69
  - w @69          | ########## | 96          | 26             | none
  - r @96          | 26,69

$finalStep:
  - w @30          | ########## | 102         | none           | 55
  - w @55          | ########## | 102         | 30             | none
  - r @102         | 30,55

$finalCatchArg:
  - w @34          | ########## | 99          | none           | 73
  - w @73          | ########## | 99          | 34             | none
  - r @99          | 34,73

tmpIfTest:
  - w @76          | ########## | 80          | none           | none
  - r @80          | 76
