# Preval test case

# indirect_inv_true.md

> Bool trampoline > Indirect inv true
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
> The func uses the arg, being an indirect alias for Boolean

## Input

`````js filename=intro
function f(arg) {
  const x = $(arg);
  const y = !x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f(100)) $('fail');
else $('pass');
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>boolean*/ = function ($$0) {
  const arg /*:unknown*/ = $$0;
  debugger;
  const x /*:unknown*/ = $(arg);
  const y /*:boolean*/ = !x;
  return y;
};
$(f);
$(f);
const tmpBoolTrampoline /*:unknown*/ = $(100);
if (tmpBoolTrampoline) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (arg) {
  const x = $(arg);
  const y = !x;
  return y;
};
$(f);
$(f);
if ($(100)) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $( b );
  const d = !c;
  return d;
};
$( a );
$( a );
const e = $( 100 );
if (e) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 100
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
