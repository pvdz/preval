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
    if (/*___66__*/ $implicitThrow) {
      /*67~69*/ throw /*___69__*/ $finalCatchArg;
    } /*70~73*/ else {
      return /*___73__*/ $finalArg;
    }
  };
let /*___75__*/ tmpCalleeParam = /*___77__*/ f();
$(/*___81__*/ tmpCalleeParam);
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
