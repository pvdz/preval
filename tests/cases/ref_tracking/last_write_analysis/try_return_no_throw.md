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
let /*___5__*/ f = function () /*7*/ {
    debugger;
    let /*___15__*/ x = 1;
    let /*___18__*/ $implicitThrow = false;
    let /*___21__*/ $finalStep = false;
    let /*___24__*/ $finalCatchArg = /*___25__*/ undefined;
    let /*___27__*/ $finalArg = /*___28__*/ undefined;
    /*___30__*/ $finally: /*31~62*/ {
      try /*33~51*/ {
        /*___41__*/ x = $(2, `prevent optim`);
        /*___45__*/ $finalStep = true;
        /*___49__*/ $finalArg = /*___48__*/ x;
        break /*___51__*/ $finally;
      } catch (/*___53__*/ $finalImplicit) /*54~62*/ {
        /*___58__*/ $implicitThrow = true;
        /*___62__*/ $finalCatchArg = /*___61__*/ $finalImplicit;
      }
    }
    /*___70__*/ x = $(3, `prevent optim`);
    if (/*___72__*/ $implicitThrow) {
      /*73~75*/ throw /*___75__*/ $finalCatchArg;
    } /*76~79*/ else {
      return /*___79__*/ $finalArg;
    }
  };
let /*___81__*/ tmpCalleeParam = /*___83__*/ f();
$(/*___87__*/ tmpCalleeParam);
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

$finalImplicit:
  - w @53          | ########## | 61          | none           | none
  - r @61          | 53

tmpCalleeParam:
  - w @81          | ########## | 87          | none           | none
  - r @87          | 81
