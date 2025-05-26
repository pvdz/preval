# Preval test case

# if_fold_ternary_const_primitive_zero_becomes_false.md

> If test merging > If fold ternary const primitive zero becomes false
>
> Test `let y = 0;` (falsy) where a subsequent if(x) keeps y constantly false.

## Input

`````js filename=intro
function testPrimitiveZero(x_param) {
  let y = 0; 
  if (x_param) {
    y = null;      // falsy
  } else {
    y = NaN;    // falsy
  }
  if (y) {
    $('Y is truthy - BAD!');
  } else {
    $('Y is falsy - GOOD!');
  }
  return y;
}
$(testPrimitiveZero(x));

/*
function testPrimitiveZero(x_param) {
  let y = 0; 
  if (x_param) {
    y = null;
  } else {
    y = NaN;
  }
  {
    $('Y is falsy - GOOD!');
  }
  return y; // y is null or NaN (falsy)
}
$(testPrimitiveZero(x));
*/
`````


## Settled


`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
if (x) {
  $(null);
} else {
  $($Number_NaN);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
if (x) {
  $(null);
} else {
  $($Number_NaN);
}
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( "Y is falsy - GOOD!" );
if (x) {
  $( null );
}
else {
  $( $Number_NaN );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testPrimitiveZero = function ($$0) {
  let x_param = $$0;
  debugger;
  let y = 0;
  if (x_param) {
    y = null;
  } else {
    y = $Number_NaN;
  }
  if (y) {
    $(`Y is truthy - BAD!`);
    return y;
  } else {
    $(`Y is falsy - GOOD!`);
    return y;
  }
};
let tmpCalleeParam = testPrimitiveZero(x);
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
