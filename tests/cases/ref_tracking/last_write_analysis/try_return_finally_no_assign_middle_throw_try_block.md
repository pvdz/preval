# Preval test case

# try_return_finally_no_assign_middle_throw_try_block.md

> Ref tracking > Last write analysis > Try return finally no assign middle throw try block
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
    // Without this assignment the next ref will want to see the previous assignment
    //x = $(3, 'prevent optim');
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
  if ($implicitThrow___66__) {
    /*67*/ throw $finalCatchArg___69__;
  } /*70*/ else {
    return $finalArg___73__;
  }
};
let tmpCalleeParam___75__ = f___77__();
$(tmpCalleeParam___81__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 77          | none           | none
  - r @77      | 5

x:
  - w @15      | ########## | not read    | none           | 41
  - w @41      | ########## | 50          | 15             | none
  - r @50      | 41

$implicitThrow:
  - w @18          | ########## | 66          | none           | 60
  - w @60          | ########## | 66          | 18             | none
  - r @66          | 18,60

$finalStep:
  - w @21          | ########## | not read    | none           | 47
  - w @47          | ########## | not read    | 21             | none

$finalCatchArg:
  - w @24          | ########## | 69          | none           | 64
  - w @64          | ########## | 69          | 24             | none
  - r @69          | 24,64

$finalArg:
  - w @27          | ########## | 73          | none           | 51
  - w @51          | ########## | 73          | 27             | none
  - r @73          | 27,51

$finalImplicit:
  - w @55          | ########## | 63          | none           | none
  - r @63          | 55

tmpCalleeParam:
  - w @75          | ########## | 81          | none           | none
  - r @81          | 75
