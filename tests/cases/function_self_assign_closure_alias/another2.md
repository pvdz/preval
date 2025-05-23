# Preval test case

# another2.md

> Function self assign closure alias > Another2

## Input

`````js filename=intro
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
$(zzzz() === zzzz());
$(x() !== x());
$(x() === zzzz());
`````


## Settled


`````js filename=intro
let zzzz /*:()=>unknown*/ = function () {
  debugger;
  const a /*:array*/ = [];
  zzzz = function ($$0, $$1) {
    debugger;
    return a;
  };
  const tmpReturnArg$23 /*:unknown*/ = zzzz();
  return tmpReturnArg$23;
};
const x /*:unknown*/ = zzzz;
const tmpBinBothLhs /*:unknown*/ = zzzz();
const tmpBinBothRhs /*:unknown*/ = zzzz();
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 /*:unknown*/ = x();
const tmpBinBothRhs$1 /*:unknown*/ = x();
const tmpCalleeParam$1 /*:boolean*/ = tmpBinBothLhs$1 !== tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 /*:unknown*/ = x();
const tmpBinBothRhs$3 /*:unknown*/ = zzzz();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
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
const tmpBinBothLhs = zzzz();
$(tmpBinBothLhs === zzzz());
const tmpBinBothLhs$1 = x();
$(tmpBinBothLhs$1 !== x());
const tmpBinBothLhs$3 = x();
$(tmpBinBothLhs$3 === zzzz());
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
const e = a();
const f = a();
const g = e === f;
$( g );
const h = d();
const i = d();
const j = h !== i;
$( j );
const k = d();
const l = a();
const m = k === l;
$( m );
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
const tmpBinBothLhs = zzzz();
const tmpBinBothRhs = zzzz();
let tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 = x();
const tmpBinBothRhs$1 = x();
let tmpCalleeParam$1 = tmpBinBothLhs$1 !== tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 = x();
const tmpBinBothRhs$3 = zzzz();
let tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
