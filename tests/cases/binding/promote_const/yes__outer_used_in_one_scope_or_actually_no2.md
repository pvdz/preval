# Preval test case

# yes__outer_used_in_one_scope_or_actually_no2.md

> Binding > Promote const > Yes  outer used in one scope or actually no2
>
> Can we inline hoisted vars

This shows why x cannot safely be SSA'd here...

## Input

`````js filename=intro
var x;
function g() {
  $('oops');
}
function f() {
  $("something");
  x = 100;
  if (g(1)) {
    $(x);
  }
  $(x);
  return x;
}
f();
`````

## Settled


`````js filename=intro
$(`something`);
$(`oops`);
$(100);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`something`);
$(`oops`);
$(100);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  $(`something`);
  x = 100;
  if (g(1)) {
    $(x);
  }
  $(x);
  return x;
};
let g = function () {
  debugger;
  $(`oops`);
};
f();
`````

## Normalized


`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  $(`something`);
  x = 100;
  const tmpIfTest = g(1);
  if (tmpIfTest) {
    $(x);
    $(x);
    return x;
  } else {
    $(x);
    return x;
  }
};
let g = function () {
  debugger;
  $(`oops`);
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( "something" );
$( "oops" );
$( 100 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'something'
 - 2: 'oops'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
