# Preval test case

# try_return_middle_throw_try_block_plus_read.md

> Ref tracking > Last write analysis > Try return middle throw try block plus read
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    x = $(2, 'prevent optim');
    do_observe_assignment
    return x;
  } finally {
    // This read should observe the 2, not 1
    $(x);
    x = $(3, 'prevent optim');
  }
  
  $('prevent return hoisting');
  return x;
}

$(f());
`````


## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () /*6*/ {
  debugger;
  let x___10__ = 1;
  let $implicitThrow___14__ = false;
  let $finalStep___18__ = false;
  let $finalCatchArg___22__ = undefined___23__;
  let $finalArg___26__ = undefined___27__;
  $finally___29__: /*30*/ {
    try /*32*/ {
      x___40__ = $(2, `prevent optim`);
      do_observe_assignment___42__;
      $finalStep___46__ = true;
      $finalArg___50__ = x___49__;
      break $finally___52__;
    } catch ($finalImplicit___54__) /*55*/ {
      $implicitThrow___59__ = true;
      $finalCatchArg___63__ = $finalImplicit___62__;
    }
  }
  $(x___67__);
  x___75__ = $(3, `prevent optim`);
  if ($implicitThrow___77__) {
    /*78*/ throw $finalCatchArg___80__;
  } /*81*/ else {
    return $finalArg___84__;
  }
};
const tmpCalleeParam___87__ = f___89__();
$(tmpCalleeParam___93__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 89          | none           | none
  - r @89      | 4

x:
  - w @10      | ########## | 67          | none           | 40,75
  - w @40      | ########## | 49,67       | 10             | 75
  - r @49      | 40
  - r @67      | 10,40
  - w @75      | ########## | not read    | 10,40          | none

$implicitThrow:
  - w @14          | ########## | 77          | none           | 59
  - w @59          | ########## | 77          | 14             | none
  - r @77          | 14,59

$finalStep:
  - w @18          | ########## | not read    | none           | 46
  - w @46          | ########## | not read    | 18             | none

$finalCatchArg:
  - w @22          | ########## | 80          | none           | 63
  - w @63          | ########## | 80          | 22             | none
  - r @80          | 22,63

$finalArg:
  - w @26          | ########## | 84          | none           | 50
  - w @50          | ########## | 84          | 26             | none
  - r @84          | 26,50

tmpCalleeParam:
  - w @87          | ########## | 93          | none           | none
  - r @93          | 87
