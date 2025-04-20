# Preval test case

# closure_inaccessible.md

> Bool trampoline > Closure inaccessible
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
> In this case the closure x is inaccessible to the caller scope

## Input

`````js filename=intro
function g() {
  let x;
  const f = function() {
    x = $(100);
    const y = Boolean(x);
    return y;
  }
  $(x);
  return f;
}
const f = g();

// Prevent simple inlining
$(f);

if (f()) $('pass');
else $('fail');

`````


## Settled


`````js filename=intro
const f$1 /*:()=>boolean*/ = function () {
  debugger;
  const tmpssa3_x /*:unknown*/ = $(100);
  const y /*:boolean*/ = $boolean_constructor(tmpssa3_x);
  return y;
};
$(undefined);
$(f$1);
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
const f$1 = function () {
  const y = $boolean_constructor($(100));
  return y;
};
$(undefined);
$(f$1);
if ($(100)) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 100 );
  const c = $boolean_constructor( b );
  return c;
};
$( undefined );
$( a );
const d = $( 100 );
if (d) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: '<function>'
 - 3: 100
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
