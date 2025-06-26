# Preval test case

# another.md

> Self assign > Closure > Closure alias > Another
>
> Array closure with function aliasing before first call

## Input

`````js filename=intro
// Should NOT get aliased because x holds a reference to the original sealer and will re-seal zzzz every call.
let zzzz = function() {
  debugger;
  const a = [];
  zzzz = function($$0, $$1) {
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
const x = zzzz;
zzzz() === zzzz();  // a1 === a1
x() !== x();        // a2 === a3
x() === zzzz();     // a4 === a4
`````


## Settled


`````js filename=intro
let zzzz /*:()=>unknown*/ = function () {
  debugger;
  const a /*:array*/ /*truthy*/ = [];
  zzzz = function ($$0, $$1) {
    debugger;
    return a;
  };
  const tmpReturnArg$23 /*:unknown*/ = zzzz();
  return tmpReturnArg$23;
};
const x /*:function*/ /*truthy*/ = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let zzzz = function () {
  const a = [];
  zzzz = function ($$0, $$1) {
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
const x = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [];
  a = function($$0,$$1 ) {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = a;
a();
a();
d();
d();
d();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let zzzz = function () {
  debugger;
  const a = [];
  zzzz = function ($$0, $$1) {
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
const x = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
