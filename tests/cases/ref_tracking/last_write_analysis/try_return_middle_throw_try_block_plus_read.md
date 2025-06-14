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
let /*___5__*/ f = function () /*7*/ {
    debugger;
    let /*___15__*/ x = 1;
    let /*___18__*/ $implicitThrow = false;
    let /*___21__*/ $finalStep = false;
    let /*___24__*/ $finalCatchArg = /*___25__*/ undefined;
    let /*___27__*/ $finalArg = /*___28__*/ undefined;
    /*___30__*/ $finally: /*31~64*/ {
      try /*33~53*/ {
        /*___41__*/ x = $(2, `prevent optim`);
        /*___43__*/ do_observe_assignment;
        /*___47__*/ $finalStep = true;
        /*___51__*/ $finalArg = /*___50__*/ x;
        break /*___53__*/ $finally;
      } catch (/*___55__*/ $finalImplicit) /*56~64*/ {
        /*___60__*/ $implicitThrow = true;
        /*___64__*/ $finalCatchArg = /*___63__*/ $finalImplicit;
      }
    }
    $(/*___68__*/ x);
    /*___76__*/ x = $(3, `prevent optim`);
    if (/*___78__*/ $implicitThrow) {
      /*79~81*/ throw /*___81__*/ $finalCatchArg;
    } /*82~85*/ else {
      return /*___85__*/ $finalArg;
    }
  };
let /*___87__*/ tmpCalleeParam = /*___89__*/ f();
$(/*___93__*/ tmpCalleeParam);
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

$finalImplicit:
  - w @55          | ########## | 63          | none           | none
  - r @63          | 55

tmpCalleeParam:
  - w @87          | ########## | 93          | none           | none
  - r @93          | 87
