# Preval test case

# closure_assignment.md

> Bool trampoline > Closure assignment
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
> The func updates a closure, which complicates the transform.

## Input

`````js filename=intro
let x;
function f() {
  x = $(100);
  const y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass');
else $('fail');
$(x);
`````


## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  x = $(100);
  const y /*:boolean*/ = $boolean_constructor(x);
  return y;
};
let x /*:unknown*/ = undefined;
$(f);
$(f);
x = $(100);
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
  x = $(100);
  const y = $boolean_constructor(x);
  return y;
};
let x = undefined;
$(f);
$(f);
x = $(100);
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
  b = $( 100 );
  const c = $boolean_constructor( b );
  return c;
};
let b = undefined;
$( a );
$( a );
b = $( 100 );
if (b) {
  $( "pass" );
  $( b );
}
else {
  $( "fail" );
  $( b );
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 100
 - 4: 'pass'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
