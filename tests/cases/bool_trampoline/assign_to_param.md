# Preval test case

# assign_to_param.md

> Bool trampoline > Assign to param
>
> Don't do this.

## Input

`````js filename=intro
function f(x) {
  x = $(0);
  const y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('fail');
else $('pass');
`````

## Settled


`````js filename=intro
const f /*:(unused)=>boolean*/ = function ($$0) {
  debugger;
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  const y /*:boolean*/ = Boolean(tmpClusterSSA_x);
  return y;
};
$(f);
$(f);
const tmpBoolTrampoline /*:unknown*/ = $(0);
if (tmpBoolTrampoline) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($$0) {
  const y = Boolean($(0));
  return y;
};
$(f);
$(f);
if ($(0)) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = Boolean(x);
  return y;
};
$(f);
$(f);
if (f()) $(`fail`);
else $(`pass`);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = Boolean(x);
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  debugger;
  const b = $( 0 );
  const c = Boolean( b );
  return c;
};
$( a );
$( a );
const d = $( 0 );
if (d) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 0
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
