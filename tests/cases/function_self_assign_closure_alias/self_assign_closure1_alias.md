# Preval test case

# self_assign_closure1_alias.md

> Function self assign closure alias > Self assign closure1 alias
>
> See self_assign_closure rule
> This is the case where the function is also aliased

## Input

`````js filename=intro
let a = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
let b = a;
// Since b() always returns a fresh reference, `a() !== b()` even though `b() === a()`
$(a() === b());
$(a() === b());
// Swapped, even now, will be equal, since b() updates the reference for a()
$(b() === a());
// But it does so every time so a still not b here
$(a() === b());
`````


## Settled


`````js filename=intro
let a /*:()=>unknown*/ = function () {
  debugger;
  const arr /*:array*/ = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg /*:unknown*/ = a();
  return tmpReturnArg;
};
const b /*:unknown*/ = a;
const tmpBinBothLhs /*:unknown*/ = a();
const tmpBinBothRhs /*:unknown*/ = b();
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 /*:unknown*/ = a();
const tmpBinBothRhs$1 /*:unknown*/ = b();
const tmpCalleeParam$1 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 /*:unknown*/ = b();
const tmpBinBothRhs$3 /*:unknown*/ = a();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
const tmpBinBothLhs$5 /*:unknown*/ = a();
const tmpBinBothRhs$5 /*:unknown*/ = b();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = function () {
  const arr = [1, 2, 3];
  a = function () {
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
const b = a;
const tmpBinBothLhs = a();
$(tmpBinBothLhs === b());
const tmpBinBothLhs$1 = a();
$(tmpBinBothLhs$1 === b());
const tmpBinBothLhs$3 = b();
$(tmpBinBothLhs$3 === a());
const tmpBinBothLhs$5 = a();
$(tmpBinBothLhs$5 === b());
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = a;
const e = a();
const f = d();
const g = e === f;
$( g );
const h = a();
const i = d();
const j = h === i;
$( j );
const k = d();
const l = a();
const m = k === l;
$( m );
const n = a();
const o = d();
const p = n === o;
$( p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = function () {
  debugger;
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
let b = a;
const tmpBinBothLhs = a();
const tmpBinBothRhs = b();
let tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 = a();
const tmpBinBothRhs$1 = b();
let tmpCalleeParam$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 = b();
const tmpBinBothRhs$3 = a();
let tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
const tmpBinBothLhs$5 = a();
const tmpBinBothRhs$5 = b();
let tmpCalleeParam$5 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: false
 - 3: true
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
