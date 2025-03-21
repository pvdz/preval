# Preval test case

# hoisting_regression_v2.md

> Function > Hoisting regression v2
>
> In this case we don't return the inner function, we send it to $ where it escapes in a black hole
> Most likely, Preval can not determine that the return value of the outer function is unused
> and as such, the regression still shows more clearly.
> At the time of the regression, the pre-normal code clearly showed how the inner function was
> hoisted to the top of the outer function while the needle comes after a conditional return.
> The normalization step still hoists the needle inside the `else`, causing the inner function to
> lose access to the variable, which is the problem this test tries to expose.

## Input

`````js filename=intro
function outer() {
  if ($()) {
    return;
  }
  let okdezemoetjezoeken = 1
  $(inner);
  function inner() {
    $(okdezemoetjezoeken);
  }
}
$(outer);


`````


## Settled


`````js filename=intro
const inner /*:()=>undefined*/ = function () {
  debugger;
  $(1);
  return undefined;
};
const outer /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $();
  if (tmpIfTest) {
    return undefined;
  } else {
    $(inner);
    return undefined;
  }
};
$(outer);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const inner = function () {
  $(1);
};
$(function () {
  const tmpIfTest = $();
  if (!tmpIfTest) {
    $(inner);
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 1 );
  return undefined;
};
const b = function() {
  debugger;
  const c = $();
  if (c) {
    return undefined;
  }
  else {
    $( a );
    return undefined;
  }
};
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
