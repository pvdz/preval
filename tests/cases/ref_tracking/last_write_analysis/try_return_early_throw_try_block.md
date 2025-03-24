# Preval test case

# try_return_early_throw_try_block.md

> Ref tracking > Last write analysis > Try return early throw try block
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    do_not_observe_assignment
    x = $(2, 'prevent optim');
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
let f___5__ = function () /*7*/ {
  debugger;
  let x___15__ = 1;
  let $implicitThrow___18__ = false;
  let $finalStep___21__ = false;
  let $finalCatchArg___24__ = undefined___25__;
  let $finalArg___27__ = undefined___28__;
  $finally___30__: /*31*/ {
    try /*33*/ {
      do_not_observe_assignment___35__;
      x___43__ = $(2, `prevent optim`);
      $finalStep___47__ = true;
      $finalArg___51__ = x___50__;
      break $finally___53__;
    } catch ($finalImplicit___55__) /*56*/ {
      $implicitThrow___60__ = true;
      $finalCatchArg___64__ = $finalImplicit___63__;
    }
  }
  x___72__ = $(3, `prevent optim`);
  if ($implicitThrow___74__) {
    /*75*/ throw $finalCatchArg___77__;
  } /*78*/ else {
    return $finalArg___81__;
  }
};
let tmpCalleeParam___83__ = f___85__();
$(tmpCalleeParam___89__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 85          | none           | none
  - r @85      | 5

x:
  - w @15      | ########## | not read    | none           | 43,72
  - w @43      | ########## | 50          | 15             | 72
  - r @50      | 43
  - w @72      | ########## | not read    | 15,43          | none

$implicitThrow:
  - w @18          | ########## | 74          | none           | 60
  - w @60          | ########## | 74          | 18             | none
  - r @74          | 18,60

$finalStep:
  - w @21          | ########## | not read    | none           | 47
  - w @47          | ########## | not read    | 21             | none

$finalCatchArg:
  - w @24          | ########## | 77          | none           | 64
  - w @64          | ########## | 77          | 24             | none
  - r @77          | 24,64

$finalArg:
  - w @27          | ########## | 81          | none           | 51
  - w @51          | ########## | 81          | 27             | none
  - r @81          | 27,51

tmpCalleeParam:
  - w @83          | ########## | 89          | none           | none
  - r @89          | 83
