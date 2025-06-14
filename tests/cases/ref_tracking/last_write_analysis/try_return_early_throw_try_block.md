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
let /*___5__*/ f = function () /*7*/ {
    debugger;
    let /*___15__*/ x = 1;
    let /*___18__*/ $implicitThrow = false;
    let /*___21__*/ $finalStep = false;
    let /*___24__*/ $finalCatchArg = /*___25__*/ undefined;
    let /*___27__*/ $finalArg = /*___28__*/ undefined;
    /*___30__*/ $finally: /*31~64*/ {
      try /*33~53*/ {
        /*___35__*/ do_not_observe_assignment;
        /*___43__*/ x = $(2, `prevent optim`);
        /*___47__*/ $finalStep = true;
        /*___51__*/ $finalArg = /*___50__*/ x;
        break /*___53__*/ $finally;
      } catch (/*___55__*/ $finalImplicit) /*56~64*/ {
        /*___60__*/ $implicitThrow = true;
        /*___64__*/ $finalCatchArg = /*___63__*/ $finalImplicit;
      }
    }
    /*___72__*/ x = $(3, `prevent optim`);
    if (/*___74__*/ $implicitThrow) {
      /*75~77*/ throw /*___77__*/ $finalCatchArg;
    } /*78~81*/ else {
      return /*___81__*/ $finalArg;
    }
  };
let /*___83__*/ tmpCalleeParam = /*___85__*/ f();
$(/*___89__*/ tmpCalleeParam);
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

$finalImplicit:
  - w @55          | ########## | 63          | none           | none
  - r @63          | 55

tmpCalleeParam:
  - w @83          | ########## | 89          | none           | none
  - r @89          | 83
