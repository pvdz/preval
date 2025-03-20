# Preval test case

# base_bool_false.md

> Bool trampoline > Base bool false
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
>
> This case does not use the func arg.

## Input

`````js filename=intro
function f() {
  const x = $(0);
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
const f /*:()=>boolean*/ = function () {
  debugger;
  const x /*:unknown*/ = $(0);
  const y /*:boolean*/ = Boolean(x);
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
const f = function () {
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


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
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
