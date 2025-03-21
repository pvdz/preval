# Preval test case

# yield.md

> Bool trampoline > Yield
>
> Don't do this.

This is testing a cloning edge case when it concerns `yield`

## Input

`````js filename=intro
function *f(x) {
  x = $(0);
  const y = yield x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass'); // Always returns an object and objects are truthy
else $('fail');
`````

## Settled


`````js filename=intro
const f /*:(unused)=>object*/ = function* ($$0) {
  debugger;
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  const y /*:unknown*/ = yield tmpClusterSSA_x;
  return y;
};
$(f);
$(f);
f();
$(`pass`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function* ($$0) {
  const tmpClusterSSA_x = $(0);
  const y = yield tmpClusterSSA_x;
  return y;
};
$(f);
$(f);
f();
$(`pass`);
`````

## Pre Normal


`````js filename=intro
let f = function* ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = yield x;
  return y;
};
$(f);
$(f);
if (f()) $(`pass`);
else $(`fail`);
`````

## Normalized


`````js filename=intro
let f = function* ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = yield x;
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function *($$0 ) {
  debugger;
  const b = $( 0 );
  const c = yield ( b );
  return c;
};
$( a );
$( a );
a();
$( "pass" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- would this not be the same as await? would we not want to infer the arg here?
- inline generator functions safely (because yield)
