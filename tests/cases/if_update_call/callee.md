# Preval test case

# callee.md

> If update call > Callee
>
> If a variable is conditionally set and then used in a call after the `if`/`else`, we can hoist the call inside those branches.

## Input

`````js filename=intro
function f(){ $('f'); }
function g(){ $('g'); }
let x = undefined;
if ($(true)) {
  x = f;
} else {
  x = g;
}
x();
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`f`);
} else {
  $(`g`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`f`);
} else {
  $(`g`);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`f`);
};
let g = function () {
  debugger;
  $(`g`);
};
let x = undefined;
if ($(true)) {
  x = f;
} else {
  x = g;
}
x();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`f`);
  return undefined;
};
let g = function () {
  debugger;
  $(`g`);
  return undefined;
};
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = f;
  f();
} else {
  x = g;
  g();
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "f" );
}
else {
  $( "g" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
