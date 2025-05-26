# Preval test case

# if_fold_ternary_const_boolean_x_becomes_x.md

> If test merging > If fold ternary const boolean x becomes x
>
> Test `let y = Boolean(x);` where `y` effectively remains equivalent to `x`.

## Input

`````js filename=intro
function test(x) {
  let y = Boolean(x);
  if (x) {
    y = true; // or no change
  } else {
    y = false; // or no change
  }

  if (y) {
    $('Y is true');
  } else {
    $('Y is false');
  }
  return y; // Return y
}
$(test(x)); // Call test and pass to $, using x as unknown parameter

/*
function test(x) {
  let y = Boolean(x);
  if (x) {
    y = true;
  } else {
    y = false;
  }

  if (x) {
    $('Y is true');
  } else {
    $('Y is false');
  }
  return y; // y is x here
}
$(test(x));
*/
`````


## Settled


`````js filename=intro
const x$1 /*:unknown*/ = x;
x;
if (x$1) {
  $(`Y is true`);
  $(true);
} else {
  $(`Y is false`);
  $(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x$1 = x;
x;
if (x$1) {
  $(`Y is true`);
  $(true);
} else {
  $(`Y is false`);
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x;
x;
if (a) {
  $( "Y is true" );
  $( true );
}
else {
  $( "Y is false" );
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = function ($$0) {
  let x$1 = $$0;
  debugger;
  let y = $boolean_constructor(x$1);
  if (x$1) {
    y = true;
  } else {
    y = false;
  }
  if (y) {
    $(`Y is true`);
    return y;
  } else {
    $(`Y is false`);
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
