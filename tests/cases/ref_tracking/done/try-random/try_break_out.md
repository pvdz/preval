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
    $(x___19__, 1);
    $(x___24__, 1);
    x___29__ = 2;
    let $implicitThrow___31__ = false;
    let $finalStep___34__ = false;
    let $finalCatchArg___37__ = undefined___38__;
    $finally___40__: /*41*/ {
      try /*43*/ {
        $(x___48__, 2);
        const tmpIfTest___51__ = 2;
        if (tmpIfTest___54__) {
          /*55*/ x___59__ = 3;
          $finalStep___63__ = true;
          break $finally___65__;
        } /*66*/ else {
          x___70__ = 4;
        }
      } catch ($finalImplicit___72__) /*73*/ {
        $implicitThrow___77__ = true;
        $finalCatchArg___81__ = $finalImplicit___80__;
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


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,24       | none           | 29
  - r @19      | 4
  - r @24      | 4
  - w @29      | ########## | 48,92,99,118,123,133 | 4              | 59,70,129
  - r @48      | 29
  - w @59      | ########## | 92,99,118,123,133 | 29             | 129
  - w @70      | ########## | 92,99,118,123,133 | 29             | 129
  - r @92      | 29,59,70
  - r @99      | 29,59,70
  - r @118     | 29,59,70
  - r @123     | 29,59,70
  - w @129     | ########## | 133         | 29,59,70       | none
  - r @133     | 29,59,70,129

$implicitThrow:
  - w @31          | ########## | 104         | none           | 77
  - w @77          | ########## | 104         | 31             | none
  - r @104         | 31,77

$finalStep:
  - w @34          | ########## | 110         | none           | 63
  - w @63          | ########## | 110         | 34             | none
  - r @110         | 34,63

$finalCatchArg:
  - w @37          | ########## | 107         | none           | 81
  - w @81          | ########## | 107         | 37             | none
  - r @107         | 37,81

tmpIfTest:
  - w @51          | ########## | 54          | none           | none
  - r @54          | 51

$finalImplicit:
  - w @72          | ########## | 80          | none           | none
  - r @80          | 72

tmpIfTest$1:
  - w @83          | ########## | 87          | none           | none
  - r @87          | 83
