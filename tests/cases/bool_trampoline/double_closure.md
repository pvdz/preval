# Preval test case

# double_closure.md

> Bool trampoline > Double closure
>
> The func updates two closures, which complicates the transform.

## Input

`````js filename=intro
let x;
let y;
function f() {
  x = $(100);
  y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass');
else $('fail');
$(x);
$(y);
`````


## Settled


`````js filename=intro
const f /*:()=>primitive*/ = function () {
  debugger;
  x = $(100);
  y = $boolean_constructor(x);
  return y;
};
let x /*:unknown*/ = undefined;
let y /*:primitive*/ = undefined;
$(f);
$(f);
f();
if (y) {
  $(`pass`);
  $(x);
  $(y);
} else {
  $(`fail`);
  $(x);
  $(y);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  x = $(100);
  y = $boolean_constructor(x);
  return y;
};
let x = undefined;
let y = undefined;
$(f);
$(f);
f();
if (y) {
  $(`pass`);
  $(x);
  $(y);
} else {
  $(`fail`);
  $(x);
  $(y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b = $( 100 );
  c = $boolean_constructor( b );
  return c;
};
let b = undefined;
let c = undefined;
$( a );
$( a );
a();
if (c) {
  $( "pass" );
  $( b );
  $( c );
}
else {
  $( "fail" );
  $( b );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  x = $(100);
  y = $boolean_constructor(x);
  return y;
};
let x = undefined;
let y = undefined;
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
  $(x);
  $(y);
} else {
  $(`fail`);
  $(x);
  $(y);
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
 - 6: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
