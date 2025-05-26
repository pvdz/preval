# Preval test case

# if_fold_ternary_const_boolean_x_becomes_false.md

> If test merging > If fold ternary const boolean x becomes false
>
> Test `let y = Boolean(x);` where `y` becomes constant `false`.

## Input

`````js filename=intro
function test(x) {
  let y = Boolean(x);
  if (x) { // x is true, y is initially true
    y = false; // y becomes false
  } else { // x is false, y is initially false
    y = false; // y remains false
  }

  // y is always false
  if (y) {
    $('Y is ???'); // Should be dead code
  } else {
    $('Y is always false');
  }
  return y; // Return y
}
$(test(x)); // Call test and pass to $, using x as unknown parameter

/*
function test(x) {
  let y = Boolean(x);
  if (x) {
    y = false;
  } else {
    y = false;
  }
  // y is always false
  {
    $('Y is always false');
  }
  return y; // y is false here
}
$(test(x));
*/
`````


## Settled


`````js filename=intro
x;
$(`Y is always false`);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$(`Y is always false`);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( "Y is always false" );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = function ($$0) {
  let x$1 = $$0;
  debugger;
  let y = $boolean_constructor(x$1);
  if (x$1) {
    y = false;
  } else {
    y = false;
  }
  if (y) {
    $(`Y is ???`);
    return y;
  } else {
    $(`Y is always false`);
    return y;
  }
};
let tmpCalleeParam = test(x);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
