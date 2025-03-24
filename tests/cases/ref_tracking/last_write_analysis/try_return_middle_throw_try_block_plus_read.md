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
let f___5__ = function () /*7*/ {
  debugger;
  let x___15__ = 1;
  let $implicitThrow___18__ = false;
  let $finalStep___21__ = false;
  let $finalCatchArg___24__ = undefined___25__;
  let $finalArg___27__ = undefined___28__;
  $finally___30__: /*31*/ {
    try /*33*/ {
      x___41__ = $(2, `prevent optim`);
      do_observe_assignment___43__;
      $finalStep___47__ = true;
      $finalArg___51__ = x___50__;
      break $finally___53__;
    } catch ($finalImplicit___55__) /*56*/ {
      $implicitThrow___60__ = true;
      $finalCatchArg___64__ = $finalImplicit___63__;
    }
  }
  $(x___68__);
  x___76__ = $(3, `prevent optim`);
  if ($implicitThrow___78__) {
    /*79*/ throw $finalCatchArg___81__;
  } /*82*/ else {
    return $finalArg___85__;
  }
};
let tmpCalleeParam___87__ = f___89__();
$(tmpCalleeParam___93__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 89          | none           | none
  - r @89      | 5

x:
  - w @15      | ########## | 68          | none           | 41,76
  - w @41      | ########## | 50,68       | 15             | 76
  - r @50      | 41
  - r @68      | 15,41
  - w @76      | ########## | not read    | 15,41          | none

$implicitThrow:
  - w @18          | ########## | 78          | none           | 60
  - w @60          | ########## | 78          | 18             | none
  - r @78          | 18,60

$finalStep:
  - w @21          | ########## | not read    | none           | 47
  - w @47          | ########## | not read    | 21             | none

$finalCatchArg:
  - w @24          | ########## | 81          | none           | 64
  - w @64          | ########## | 81          | 24             | none
  - r @81          | 24,64

$finalArg:
  - w @27          | ########## | 85          | none           | 51
  - w @51          | ########## | 85          | 27             | none
  - r @85          | 27,51

tmpCalleeParam:
  - w @87          | ########## | 93          | none           | none
  - r @93          | 87
