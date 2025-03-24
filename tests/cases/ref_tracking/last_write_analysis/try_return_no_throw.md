# Preval test case

# try_return_no_throw.md

> Ref tracking > Last write analysis > Try return no throw
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
      x___41__ = $(2, `prevent optim`);
      $finalStep___45__ = true;
      $finalArg___49__ = x___48__;
      break $finally___51__;
    } catch ($finalImplicit___53__) /*54*/ {
      $implicitThrow___58__ = true;
      $finalCatchArg___62__ = $finalImplicit___61__;
    }
  }
  x___70__ = $(3, `prevent optim`);
  if ($implicitThrow___72__) {
    /*73*/ throw $finalCatchArg___75__;
  } /*76*/ else {
    return $finalArg___79__;
  }
};
let tmpCalleeParam___81__ = f___83__();
$(tmpCalleeParam___87__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 83          | none           | none
  - r @83      | 5

x:
  - w @15      | ########## | not read    | none           | 41,70
  - w @41      | ########## | 48          | 15             | 70
  - r @48      | 41
  - w @70      | ########## | not read    | 15,41          | none

$implicitThrow:
  - w @18          | ########## | 72          | none           | 58
  - w @58          | ########## | 72          | 18             | none
  - r @72          | 18,58

$finalStep:
  - w @21          | ########## | not read    | none           | 45
  - w @45          | ########## | not read    | 21             | none

$finalCatchArg:
  - w @24          | ########## | 75          | none           | 62
  - w @62          | ########## | 75          | 24             | none
  - r @75          | 24,62

$finalArg:
  - w @27          | ########## | 79          | none           | 49
  - w @49          | ########## | 79          | 27             | none
  - r @79          | 27,49

tmpCalleeParam:
  - w @81          | ########## | 87          | none           | none
  - r @87          | 81
