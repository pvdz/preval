# Preval test case

# self_assign_closure1_alias2.md

> Function self assign closure alias > Self assign closure1 alias2
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
let b = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
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
const b /*:()=>unknown*/ = function () {
  debugger;
  const arr$1 /*:array*/ = [1, 2, 3];
  a = function () {
    debugger;
    return arr$1;
  };
  const tmpReturnArg$1 /*:unknown*/ = a();
  return tmpReturnArg$1;
};
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
const b = function () {
  const arr$1 = [1, 2, 3];
  a = function () {
    return arr$1;
  };
  const tmpReturnArg$1 = a();
  return tmpReturnArg$1;
};
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
const d = function() {
  debugger;
  const e = [ 1, 2, 3 ];
  a = function() {
    debugger;
    return e;
  };
  const f = a();
  return f;
};
const g = a();
const h = d();
const i = g === h;
$( i );
const j = a();
const k = d();
const l = j === k;
$( l );
const m = d();
const n = a();
const o = m === n;
$( o );
const p = a();
const q = d();
const r = p === q;
$( r );
`````


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
