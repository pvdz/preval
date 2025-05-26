# Preval test case

# if_fold_ternary_const_builtin_nan_always_false.md

> If test merging > If fold ternary const builtin nan always false
>
> Test `let y = !x;` where `y` is assigned `Number.NaN` (falsy built-in).

## Input

`````js filename=intro
function testBuiltinNaN(x) {
  let y = !x;
  if (x) { // y starts false if x is true
    y = Number.NaN; // y becomes NaN (falsy)
  } else { // y starts true if x is false
    y = Number.NaN; // y becomes NaN (falsy)
  }

  // y should always be falsy here
  if (y) {
    $('Y is truthy - BAD!');
  } else {
    $('Y is falsy - GOOD!');
  }
  return y; // Return y
}
$(testBuiltinNaN(x)); // Pass x, treated as unknown by Preval for test parameters

/*
function testBuiltinNaN(x) {
  let y = !x;
  if (x) {
    y = Number.NaN;
  } else {
    y = Number.NaN;
  }

  // y is always falsy
  {
    $('Y is falsy - GOOD!');
  }
  return y; // y is NaN (falsy) here
}
$(testBuiltinNaN(x));
*/
`````


## Settled


`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( "Y is falsy - GOOD!" );
$( $Number_NaN );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testBuiltinNaN = function ($$0) {
  let x$1 = $$0;
  debugger;
  let y = !x$1;
  if (x$1) {
    y = Number.NaN;
  } else {
    y = Number.NaN;
  }
  if (y) {
    $(`Y is truthy - BAD!`);
    return y;
  } else {
    $(`Y is falsy - GOOD!`);
    return y;
  }
};
let tmpCalleeParam = testBuiltinNaN(x);
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
