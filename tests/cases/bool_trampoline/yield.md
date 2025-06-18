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
const f /*:()=>object*/ = function* () {
  debugger;
  const x /*:unknown*/ = $(0);
  const y /*:unknown*/ = yield x;
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
const f = function* () {
  const x = $(0);
  const y = yield x;
  return y;
};
$(f);
$(f);
f();
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function *() {
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


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


- (todo) inline generator functions safely (because yield)
- (todo) would this not be the same as await? would we not want to infer the arg here?


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
