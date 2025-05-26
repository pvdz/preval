# Preval test case

# if_fold_ternary_const_double_negation_becomes_true.md

> If test merging > If fold ternary const double negation becomes true
>
> Test `let y = !!x;` where `y` becomes constant `true`.

## Input

`````js filename=intro
const x = $(true);
function test(x) {
  let y = !!x;
  if (x) { // x is true, y is initially true
    y = true; // y remains true
  } else { // x is false, y is initially false
    y = true; // y becomes true
  }

  // y is always true
  if (y) {
    $('Y is always true');
  } else {
    $('Y is ???'); // Should be dead code
  }
  return y; // Return y
}
$(test(x)); // Call test and pass to $, using x as unknown parameter

/*
function test(x) {
  let y = !!x;
  if (x) {
    y = true;
  } else {
    y = true;
  }
  // y is always true
  {
    $('Y is always true');
  }
  return y; // y is true here
}
$(test(x));
*/
`````


## Settled


`````js filename=intro
$(true);
$(`Y is always true`);
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`Y is always true`);
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "Y is always true" );
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpUnaryArg = !x$1;
  let y = !tmpUnaryArg;
  if (x$1) {
    y = true;
  } else {
    y = true;
  }
  if (y) {
    $(`Y is always true`);
    return y;
  } else {
    $(`Y is ???`);
    return y;
  }
};
const x = $(true);
let tmpCalleeParam = test(x);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'Y is always true'
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
