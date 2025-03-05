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
  if ($implicitThrow___65__) {
    /*66*/ throw $finalCatchArg___68__;
  } /*69*/ else {
    return $finalArg___72__;
  }
};
const tmpCalleeParam___75__ = f___77__();
$(tmpCalleeParam___81__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 77          | none           | none
  - r @77      | 4

x:
  - w @10      | ########## | not read    | none           | 40
  - w @40      | ########## | 49          | 10             | none
  - r @49      | 40

$implicitThrow:
  - w @14          | ########## | 65          | none           | 59
  - w @59          | ########## | 65          | 14             | none
  - r @65          | 14,59

$finalStep:
  - w @18          | ########## | not read    | none           | 46
  - w @46          | ########## | not read    | 18             | none

$finalCatchArg:
  - w @22          | ########## | 68          | none           | 63
  - w @63          | ########## | 68          | 22             | none
  - r @68          | 22,63

$finalArg:
  - w @26          | ########## | 72          | none           | 50
  - w @50          | ########## | 72          | 26             | none
  - r @72          | 26,50

tmpCalleeParam:
  - w @75          | ########## | 81          | none           | none
  - r @81          | 75
