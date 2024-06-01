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
let f___4__ = function () {
  debugger;
  let x___10__ = 1;
  let $implicitThrow___14__ = false;
  let $finalStep___18__ = false;
  let $finalCatchArg___22__ = undefined___23__;
  let $finalArg___26__ = undefined___27__;
  $finally___29__: /*30*/ {
    try /*32*/ {
      x___40__ = $(2, `prevent optim`);
      $finalStep___44__ = true;
      $finalArg___48__ = x___47__;
      break $finally___50__;
    } catch ($finalImplicit___52__) /*53*/ {
      $implicitThrow___57__ = true;
      $finalCatchArg___61__ = $finalImplicit___60__;
    }
  }
  x___69__ = $(3, `prevent optim`);
  if ($implicitThrow___71__) {
    /*72*/ throw $finalCatchArg___74__;
  } /*75*/ else {
    return $finalArg___78__;
  }
};
const tmpCallCallee___81__ = $;
const tmpCalleeParam___85__ = f___87__();
tmpCallCallee___90__(tmpCalleeParam___91__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 87          | none           | none
  - r @87      | 4

x:
  - w @10      | ########## | not read    | none           | 40,69
  - w @40      | ########## | 47          | 10             | 69
  - r @47      | 40
  - w @69      | ########## | not read    | 10,40          | none

$implicitThrow:
  - w @14          | ########## | 71          | none           | 57
  - w @57          | ########## | 71          | 14             | none
  - r @71          | 14,57

$finalStep:
  - w @18          | ########## | not read    | none           | 44
  - w @44          | ########## | not read    | 18             | none

$finalCatchArg:
  - w @22          | ########## | 74          | none           | 61
  - w @61          | ########## | 74          | 22             | none
  - r @74          | 22,61

$finalArg:
  - w @26          | ########## | 78          | none           | 48
  - w @48          | ########## | 78          | 26             | none
  - r @78          | 26,48

tmpCallCallee:
  - w @81          | ########## | 90          | none           | none
  - r @90          | 81

tmpCalleeParam:
  - w @85          | ########## | 91          | none           | none
  - r @91          | 85
