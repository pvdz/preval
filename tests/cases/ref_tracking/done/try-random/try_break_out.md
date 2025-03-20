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
  $(x,1);             // x=1
  A: {
    $(x,1);           // x=1
    x = 2;
    B: {
      try {
        $(x,2);       // x=2
        if (x,2) {    // x=2
          x = 3;
          break A;
        }
        x = 4;
      } finally {
        if ($()) {
          $(x);       // x=2 3 4
          // This overrides the original continuation, both the implicit (x=4)
          // and the break to A (x=3) and even the unexpected throw (x=2).
          break B;
        }
        $(x, 2,3,4);  // x=2 3 4
      }
      // (NOT 3: either that breaks to A or to B)
      // (NOT 2: can only happen with an unexpected throw which would
      // either be overridden by the break to B (skips this) and else
      // would still throw after the finally completes)
      // Not sure if I can manage that but I also don't really have a choice 
      $(x, 4);       // x=4
    }
    $(x,3,4);        // x=3 4
    x = 5;
  }
  // If try throws immediately, then x=2 and if break overrides, then x=5
  // If try breaks then x=3. Either finally breaks then x=5 or not then x=3
  // If try doesnt break then x=4, then either way x=5, so 4 is not visible
  $(x);               // x=3 5
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
A___7__: /*8*/ {
  B___10__: /*11*/ {
    $(x___15__, 1);
    $(x___20__, 1);
    x___25__ = 2;
    let $implicitThrow___28__ = false;
    let $finalStep___32__ = false;
    let $finalCatchArg___36__ = undefined___37__;
    $finally___39__: /*40*/ {
      try /*42*/ {
        $(x___46__, 2);
        const tmpIfTest___50__ = 2;
        if (tmpIfTest___53__) {
          /*54*/ x___58__ = 3;
          $finalStep___62__ = true;
          break $finally___64__;
        } /*65*/ else {
          x___69__ = 4;
        }
      } catch ($finalImplicit___71__) /*72*/ {
        $implicitThrow___76__ = true;
        $finalCatchArg___80__ = $finalImplicit___79__;
      }
    }
    const tmpIfTest$1___83__ = $();
    if (tmpIfTest$1___87__) {
      /*88*/ $(x___92__);
      break B___94__;
    } /*95*/ else {
      $(x___99__, 2, 3, 4);
      if ($implicitThrow___104__) {
        /*105*/ throw $finalCatchArg___107__;
      } /*108*/ else {
        if ($finalStep___110__) {
          /*111*/ break A___113__;
        } /*114*/ else {
          $(x___118__, 4);
        }
      }
    }
  }
  $(x___123__, 3, 4);
  x___129__ = 5;
}
$(x___133__);
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,20       | none           | 25
  - r @15      | 4
  - r @20      | 4
  - w @25      | ########## | 46,92,99,118,123,133 | 4              | 58,69,129
  - r @46      | 25
  - w @58      | ########## | 92,99,118,123,133 | 25             | 129
  - w @69      | ########## | 92,99,118,123,133 | 25             | 129
  - r @92      | 25,58,69
  - r @99      | 25,58,69
  - r @118     | 25,58,69
  - r @123     | 25,58,69
  - w @129     | ########## | 133         | 25,58,69       | none
  - r @133     | 25,58,69,129

$implicitThrow:
  - w @28          | ########## | 104         | none           | 76
  - w @76          | ########## | 104         | 28             | none
  - r @104         | 28,76

$finalStep:
  - w @32          | ########## | 110         | none           | 62
  - w @62          | ########## | 110         | 32             | none
  - r @110         | 32,62

$finalCatchArg:
  - w @36          | ########## | 107         | none           | 80
  - w @80          | ########## | 107         | 36             | none
  - r @107         | 36,80

tmpIfTest:
  - w @50          | ########## | 53          | none           | none
  - r @53          | 50

tmpIfTest$1:
  - w @83          | ########## | 87          | none           | none
  - r @87          | 83
