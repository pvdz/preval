# Preval test case

# try_return_middle_throw_try_block.md

> Ref tracking > Last write analysis > Try return middle throw try block
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
  x___71__ = $(3, `prevent optim`);
  if ($implicitThrow___73__) {
    /*74*/ throw $finalCatchArg___76__;
  } /*77*/ else {
    return $finalArg___80__;
  }
};
const tmpCalleeParam___83__ = f___85__();
$(tmpCalleeParam___89__);
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 85          | none           | none
  - r @85      | 4

x:
  - w @10      | ########## | not read    | none           | 40,71
  - w @40      | ########## | 49          | 10             | 71
  - r @49      | 40
  - w @71      | ########## | not read    | 10,40          | none

$implicitThrow:
  - w @14          | ########## | 73          | none           | 59
  - w @59          | ########## | 73          | 14             | none
  - r @73          | 14,59

$finalStep:
  - w @18          | ########## | not read    | none           | 46
  - w @46          | ########## | not read    | 18             | none

$finalCatchArg:
  - w @22          | ########## | 76          | none           | 63
  - w @63          | ########## | 76          | 22             | none
  - r @76          | 22,63

$finalArg:
  - w @26          | ########## | 80          | none           | 50
  - w @50          | ########## | 80          | 26             | none
  - r @80          | 26,50

tmpCalleeParam:
  - w @83          | ########## | 89          | none           | none
  - r @89          | 83
