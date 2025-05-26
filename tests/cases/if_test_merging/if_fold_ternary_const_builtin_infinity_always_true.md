# Preval test case

# if_fold_ternary_const_builtin_infinity_always_true.md

> If test merging > If fold ternary const builtin infinity always true
>
> Test `let y = !x;` where `y` is assigned `Number.POSITIVE_INFINITY` (truthy built-in).

## Input

`````js filename=intro
const x = $(true);
function testBuiltinInfinity(x) {
  let y = !x;
  if (x) { // y starts false if x is true
    y = Number.POSITIVE_INFINITY; // y becomes Infinity (truthy)
  } else { // y starts true if x is false
    // y remains true (initial value)
    // or could be: y = Number.POSITIVE_INFINITY; // y becomes Infinity (truthy)
  }

  // y should always be truthy here
  if (y) {
    $('Y is truthy - GOOD!');
  } else {
    $('Y is falsy - BAD!');
  }
  return y;
}
$(testBuiltinInfinity(x));

/*
function testBuiltinInfinity(x) {
  let y = !x;
  if (x) {
    y = Number.POSITIVE_INFINITY;
  } else {
    // y remains true or becomes Infinity
  }

  // y is always truthy
  {
    $('Y is truthy - GOOD!');
  }
  return y;
}
$(testBuiltinInfinity(x));
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
let y /*:primitive*/ /*ternaryConst*/ = !x;
if (x) {
  y = Number.POSITIVE_INFINITY;
} else {
}
if (y) {
  $(`Y is truthy - GOOD!`);
  $(y);
} else {
  $(`Y is falsy - BAD!`);
  $(y);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
let y = !x;
if (x) {
  y = Number.POSITIVE_INFINITY;
}
if (y) {
  $(`Y is truthy - GOOD!`);
  $(y);
} else {
  $(`Y is falsy - BAD!`);
  $(y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
let b = !a;
if (a) {
  b = Number.POSITIVE_INFINITY;
}
if (b) {
  $( "Y is truthy - GOOD!" );
  $( b );
}
else {
  $( "Y is falsy - BAD!" );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testBuiltinInfinity = function ($$0) {
  let x$1 = $$0;
  debugger;
  let y = !x$1;
  if (x$1) {
    y = Number.POSITIVE_INFINITY;
  } else {
  }
  if (y) {
    $(`Y is truthy - GOOD!`);
    return y;
  } else {
    $(`Y is falsy - BAD!`);
    return y;
  }
};
const x = $(true);
let tmpCalleeParam = testBuiltinInfinity(x);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'Y is truthy - GOOD!'
 - 3: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
