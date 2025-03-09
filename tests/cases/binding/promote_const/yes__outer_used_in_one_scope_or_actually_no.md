# Preval test case

# yes__outer_used_in_one_scope_or_actually_no.md

> Binding > Promote const > Yes  outer used in one scope or actually no
>
> Can we inline hoisted vars

This shows why x cannot safely be SSA'd here...

This one shadows the other to see what happens when the func doesn't close over x.

## Input

`````js filename=intro
var x;
function g() {
  x = $('oops');
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
const x /*:unknown*/ = $(`oops`);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`something`);
$($(`oops`));
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
  x = $(`oops`);
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
  x = $(`oops`);
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( "something" );
const a = $( "oops" );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'something'
 - 2: 'oops'
 - 3: 'oops'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
