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
const arr /*:array*/ /*truthy*/ = [1, 2, 3, 4];
const f /*:(unknown, unused)=>primitive*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  debugger;
  const index /*:number*/ = a - 427;
  const n /*:primitive*/ = arr[index];
  return n;
};
const tmpCalleeParam /*:primitive*/ = f(428);
$(tmpCalleeParam);
const tmpCalleeParam$3 /*:primitive*/ = f(429);
$(tmpCalleeParam$3);
const tmpCalleeParam$7 /*:primitive*/ = f(430);
$(tmpCalleeParam$7);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4];
const f = function (a, $$1) {
  const index = a - 427;
  const n = arr[index];
  return n;
};
$(f(428));
$(f(429));
$(f(430));
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
const b = function($$0,$$1 ) {
  const c = $$0;
  debugger;
  const d = c - 427;
  const e = a[ d ];
  return e;
};
const f = b( 428 );
$( f );
const g = b( 429 );
$( g );
const h = b( 430 );
$( h );
$( b );
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
