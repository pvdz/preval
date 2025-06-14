# Preval test case

# if_return_else_false_reftest.md

> Ref tracking > Last write analysis > If return else false reftest
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($(false)) {
    x = $(2, 'prevent optim');
    return x;
  } else {
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
    let /*___12__*/ x = 1;
    const /*___15__*/ tmpIfTest = $(false);
    if (/*___20__*/ tmpIfTest) {
      /*21~32*/ /*___29__*/ x = $(2, `prevent optim`);
      return /*___32__*/ x;
    } /*33~48*/ else {
      /*___41__*/ x = $(3, `prevent optim`);
      $(`prevent return hoisting`);
      return /*___48__*/ x;
    }
  };
let /*___50__*/ tmpCalleeParam = /*___52__*/ f();
$(/*___56__*/ tmpCalleeParam);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 52          | none           | none
  - r @52      | 5

x:
  - w @12      | ########## | not read    | none           | 29,41
  - w @29      | ########## | 32          | 12             | none
  - r @32      | 29
  - w @41      | ########## | 48          | 12             | none
  - r @48      | 41

tmpIfTest:
  - w @15      | ########## | 20          | none           | none
  - r @20      | 15

tmpCalleeParam:
  - w @50          | ########## | 56          | none           | none
  - r @56          | 50
