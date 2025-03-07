# Preval test case

# base.md

> Static arg ops > Coerce > Stmt > Base

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  $coerce(x, 'number');
  $(1);
  $(2);
};
f(3);
f(4);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(`50`);
const f /*:()=>undefined*/ = function () {
  debugger;
  $(1);
  $(2);
  return undefined;
};
$coerce(x, `number`);
f();
$coerce(x, `number`);
f();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`50`);
const f = function () {
  $(1);
  $(2);
};
$coerce(x, `number`);
f();
$coerce(x, `number`);
f();
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  let c = $$0;
  debugger;
  $coerce(x, `number`);
  $(1);
  $(2);
};
f(3);
f(4);
`````

## Normalized


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  let c = $$0;
  debugger;
  $coerce(x, `number`);
  $(1);
  $(2);
  return undefined;
};
f(3);
f(4);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "50" );
const b = function() {
  debugger;
  $( 1 );
  $( 2 );
  return undefined;
};
$coerce( a, "number" );
b();
$coerce( a, "number" );
b();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
