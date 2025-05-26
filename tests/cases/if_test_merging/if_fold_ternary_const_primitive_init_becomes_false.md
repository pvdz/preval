# Preval test case

# if_fold_ternary_const_primitive_init_becomes_false.md

> If test merging > If fold ternary const primitive init becomes false
>
> Test `let y = <primitive>;` where a subsequent if(x) makes y constantly false.

## Input

`````js filename=intro
function testPrimitiveInit(x_param) {
  let y = true; // y is initially a truthy primitive
  // let x = x_param; // x is the control variable for the IF

  if (x_param) { // If block based on x_param
    y = false;   // y becomes falsy
  } else {
    y = false;   // y becomes falsy
  }

  // y should always be falsy here
  if (y) {
    $('Y is truthy - BAD!');
  } else {
    $('Y is falsy - GOOD!');
  }
  return y;
}
$(testPrimitiveInit(x)); // x is the unknown from the test harness

/*
function testPrimitiveInit(x_param) {
  let y = true;
  // let x = x_param;

  if (x_param) {
    y = false;
  } else {
    y = false;
  }

  // y is always falsy
  {
    $('Y is falsy - GOOD!');
  }
  return y; // y is false here
}
$(testPrimitiveInit(x));
*/
`````


## Settled


`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( "Y is falsy - GOOD!" );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testPrimitiveInit = function ($$0) {
  let x_param = $$0;
  debugger;
  let y = true;
  if (x_param) {
    y = false;
  } else {
    y = false;
  }
  if (y) {
    $(`Y is truthy - BAD!`);
    return y;
  } else {
    $(`Y is falsy - GOOD!`);
    return y;
  }
};
let tmpCalleeParam = testPrimitiveInit(x);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
