# Preval test case

# try_inside_break.md

> Ref tracking > Tofix > Try inside break
>
> The challenge of this test is that the break to B inside the finally
> does not affect the break to A. This means that the write x=3 is not 
> overwritten by x=5 later, unlike the x=4 write which is overwritten.
> The x=2 case is observed inside the finally but then crashes so it 
> is not observed by the final read.
> Hence the final read can only see x=3 and x=5

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);         // x=1
  A: {
    $(x);       // x=1
    x = 2;
    try {
      $(x);     // x=2
      if ($) {
        x = 3;
        break A;
      }
      x = 4;
    } finally {
      B: {
        if ($) {
          $(x, 'breaking'); // x=2 3 4
          // Does not change outer break continuation
          // That break should still go to after `A` and
          // the natural completion should still continue
          // after the Try.
          // Each with their appropriate exitWrites ...
          break B;
        }
        $(x, 'in'); // x=2 3 4
      }
      $(x, 'out'); // x=2 3 4
    }
    // NOT 2, that can only be a throw, which after the finally would continue
    //        the throw so not reach here.
    // NOT 3, breaks to A
    $(x, 'after label'); // x=4
    x = 5;
  }
  // Either the try trips immediately, then x=2 into finally into throw
  // Or the try breaks, then x=3 into finally into A
  // Or the try completes naturally, then x=4 into finally into x=5
  // The finally does not change x
  // The x=2 case would throw so it's not further observed after finally
  // The x=3 case jumps over x=5 and goes straight to the end after finally
  // The x=4 case goes naturally into x=5
  $(x, 'end'); // x=3 5
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
A___7__: /*8*/ {
  $(x___15__);
  $(x___19__);
  x___23__ = 2;
  let $implicitThrow___25__ = false;
  let $finalStep___28__ = false;
  let $finalCatchArg___31__ = undefined___32__;
  B___34__: /*35*/ {
    $finally___37__: /*38*/ {
      try /*40*/ {
        $(x___44__);
        if ($) {
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
    if ($) {
      /*76*/ $(x___80__, `breaking`);
      break B___84__;
    } /*85*/ else {
      $(x___89__, `in`);
    }
  }
  $(x___95__, `out`);
  if ($implicitThrow___99__) {
    /*100*/ throw $finalCatchArg___102__;
  } /*103*/ else {
    if ($finalStep___105__) {
      /*106*/ break A___108__;
    } /*109*/ else {
      $(x___113__, `after label`);
      x___119__ = 5;
    }
  }
}
$(x___123__, `end`);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,19       | none           | 23
  - r @15      | 4
  - r @19      | 4
  - w @23      | ########## | 44,80,89,95,113,123 | 4              | 51,62,119
  - r @44      | 23
  - w @51      | ########## | 80,89,95,113,123 | 23             | 119
  - w @62      | ########## | 80,89,95,113,123 | 23             | 119
  - r @80      | 23,51,62
  - r @89      | 23,51,62
  - r @95      | 23,51,62
  - r @113     | 23,51,62
  - w @119     | ########## | 123         | 23,51,62       | none
  - r @123     | 23,51,62,119

$implicitThrow:
  - w @25          | ########## | 99          | none           | 69
  - w @69          | ########## | 99          | 25             | none
  - r @99          | 25,69

$finalStep:
  - w @28          | ########## | 105         | none           | 55
  - w @55          | ########## | 105         | 28             | none
  - r @105         | 28,55

$finalCatchArg:
  - w @31          | ########## | 102         | none           | 73
  - w @73          | ########## | 102         | 31             | none
  - r @102         | 31,73

$finalImplicit:
  - w @64          | ########## | 72          | none           | none
  - r @72          | 64
