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
$(x___9__);
A___11__: /*12*/ {
  $(x___16__);
  x___20__ = 2;
  let $implicitThrow___23__ = false;
  let $finalStep___27__ = false;
  let $finalCatchArg___31__ = undefined___32__;
  $finally___34__: /*35*/ {
    try /*37*/ {
      $(x___41__);
      if ($) {
        /*44*/ x___48__ = 3;
        $finalStep___52__ = true;
        break $finally___54__;
      } /*55*/ else {
        x___59__ = 4;
      }
    } catch ($finalImplicit___61__) /*62*/ {
      $implicitThrow___66__ = true;
      $finalCatchArg___70__ = $finalImplicit___69__;
    }
  }
  B___72__: /*73*/ {
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

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,16,123    | none           | 20
  - r @9       | 4
  - r @16      | 4
  - w @20      | ########## | 41,80,89,95,113,123 | 4              | 48,59,119
  - r @41      | 20
  - w @48      | ########## | 80,89,95,113,123 | 20             | 119
  - w @59      | ########## | 80,89,95,113,123 | 20             | 119
  - r @80      | 20,48,59
  - r @89      | 20,48,59
  - r @95      | 20,48,59
  - r @113     | 20,48,59
  - w @119     | ########## | 123         | 20,48,59       | none
  - r @123     | 4,20,48,59,119

$implicitThrow:
  - w @23          | ########## | 99          | none           | 66
  - w @66          | ########## | 99          | 23             | none
  - r @99          | 23,66

$finalStep:
  - w @27          | ########## | 105         | none           | 52
  - w @52          | ########## | 105         | 27             | none
  - r @105         | 27,52

$finalCatchArg:
  - w @31          | ########## | 102         | none           | 70
  - w @70          | ########## | 102         | 31             | none
  - r @102         | 31,70
