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
let /*___4__*/ x = 1;
/*___7__*/ A: /*8~119*/ {
  $(/*___15__*/ x);
  $(/*___19__*/ x);
  /*___23__*/ x = 2;
  let /*___25__*/ $implicitThrow = false;
  let /*___28__*/ $finalStep = false;
  let /*___31__*/ $finalCatchArg = /*___32__*/ undefined;
  /*___34__*/ B: /*35~91*/ {
    /*___37__*/ $finally: /*38~73*/ {
      try /*40~62*/ {
        $(/*___44__*/ x);
        if ($) {
          /*47~57*/ /*___51__*/ x = 3;
          /*___55__*/ $finalStep = true;
          break /*___57__*/ $finally;
        } /*58~62*/ else {
          /*___62__*/ x = 4;
        }
      } catch (/*___64__*/ $finalImplicit) /*65~73*/ {
        /*___69__*/ $implicitThrow = true;
        /*___73__*/ $finalCatchArg = /*___72__*/ $finalImplicit;
      }
    }
    if ($) {
      /*76~84*/ $(/*___80__*/ x, `breaking`);
      break /*___84__*/ B;
    } /*85~91*/ else {
      $(/*___89__*/ x, `in`);
    }
  }
  $(/*___95__*/ x, `out`);
  if (/*___99__*/ $implicitThrow) {
    /*100~102*/ throw /*___102__*/ $finalCatchArg;
  } /*103~119*/ else {
    if (/*___105__*/ $finalStep) {
      /*106~108*/ break /*___108__*/ A;
    } /*109~119*/ else {
      $(/*___113__*/ x, `after label`);
      /*___119__*/ x = 5;
    }
  }
}
$(/*___123__*/ x, `end`);
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
