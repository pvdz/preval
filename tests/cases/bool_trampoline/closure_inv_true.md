# Preval test case

# closure_inv_true.md

> Bool trampoline > Closure inv true
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
>
> This case does not use the func arg.

## Input

`````js filename=intro
let x = 1;
function f() {
  x = $(1);
  const y = !x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('fail');
else $('pass');
$(x);
`````


## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  x = $(1);
  const y /*:boolean*/ /*banged*/ = !x;
  return y;
};
let x /*:unknown*/ = 1;
$(f);
$(f);
x = $(1);
if (x) {
  $(`pass`);
  $(x);
} else {
  $(`fail`);
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  x = $(1);
  const y = !x;
  return y;
};
let x = 1;
$(f);
$(f);
x = $(1);
if (x) {
  $(`pass`);
  $(x);
} else {
  $(`fail`);
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b = $( 1 );
  const c = !b;
  return c;
};
let b = 1;
$( a );
$( a );
b = $( 1 );
if (b) {
  $( "pass" );
  $( b );
}
else {
  $( "fail" );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  x = $(1);
  const y = !x;
  return y;
};
let x = 1;
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`fail`);
  $(x);
} else {
  $(`pass`);
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 1
 - 4: 'pass'
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
