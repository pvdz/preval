# Preval test case

# excessive_arg.md

> Ref tracking > Excessive arg

At the time of writing, the function ended up with an unused parameter. Maybe because it escapes?
The arg is unused and if `arguments` is not referenced it's only observable through `f.length`...

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
let f = function(a, b) {
  f = function(c, d) {
    const index = c - 427;
    const n = arr[index];
    return n;
  };
  const tmp = f(a, b);
  return tmp;
};
const alias = f;
$(f(427 + 1));
$(f(427 + 2));
$(f(427 + 3));
$(alias);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3, 4];
let f /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  debugger;
  f = function ($$0, $$1) {
    const c /*:unknown*/ = $$0;
    debugger;
    const index /*:number*/ = c - 427;
    const n /*:primitive*/ = arr[index];
    return n;
  };
  const tmp /*:unknown*/ = f(a, b);
  return tmp;
};
const alias /*:unknown*/ = f;
const tmpCalleeParam /*:unknown*/ = f(428);
$(tmpCalleeParam);
const tmpCalleeParam$3 /*:unknown*/ = f(429);
$(tmpCalleeParam$3);
const tmpCalleeParam$7 /*:unknown*/ = f(430);
$(tmpCalleeParam$7);
$(alias);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4];
let f = function (a, b) {
  f = function (c, $$1) {
    const index = c - 427;
    const n = arr[index];
    return n;
  };
  const tmp = f(a, b);
  return tmp;
};
const alias = f;
$(f(428));
$(f(429));
$(f(430));
$(alias);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
let b = function($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  b = function($$0,$$1 ) {
    const e = $$0;
    debugger;
    const f = e - 427;
    const g = a[ f ];
    return g;
  };
  const h = b( c, d );
  return h;
};
const i = b;
const j = b( 428 );
$( j );
const k = b( 429 );
$( k );
const l = b( 430 );
$( l );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3, 4];
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  f = function ($$0, $$1) {
    let c = $$0;
    let d = $$1;
    debugger;
    const index = c - 427;
    const n = arr[index];
    return n;
  };
  const tmp = f(a, b);
  return tmp;
};
const alias = f;
const tmpCallCallee = f;
let tmpCalleeParam$1 = 428;
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = 429;
let tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
let tmpCalleeParam$9 = 430;
let tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
$(alias);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) self-closing function which was called immediately but may not have further refs, currently blocked on non-call usages


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 4
 - 4: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
