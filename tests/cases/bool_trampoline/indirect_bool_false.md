# Preval test case

# indirect_bool_false.md

> Bool trampoline > Indirect bool false
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
> The func uses the arg, being an indirect alias for Boolean

## Input

`````js filename=intro
function f(arg) {
  const x = $(arg);
  const y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f($(0))) $('fail');
else $('pass');
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>boolean*/ = function ($$0) {
  const arg /*:unknown*/ = $$0;
  debugger;
  const x /*:unknown*/ = $(arg);
  const y /*:boolean*/ = $boolean_constructor(x);
  return y;
};
$(f);
$(f);
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpBoolTrampoline /*:unknown*/ = $(tmpCalleeParam);
if (tmpBoolTrampoline) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (arg) {
  const y = $boolean_constructor($(arg));
  return y;
};
$(f);
$(f);
if ($($(0))) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $( b );
  const d = $boolean_constructor( c );
  return d;
};
$( a );
$( a );
const e = $( 0 );
const f = $( e );
if (f) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let arg = $$0;
  debugger;
  const x = $(arg);
  const y = $boolean_constructor(x);
  return y;
};
$(f);
$(f);
const tmpCallCallee = f;
let tmpCalleeParam = $(0);
const tmpIfTest = f(tmpCalleeParam);
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
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
 - 3: 0
 - 4: 0
 - 5: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
