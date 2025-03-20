# Preval test case

# webasm_far_far_away_maybe.md

> Tofix > webasm far far away maybe
>
> webassembly bootstrap js1k: https://wasmgroundup.com/blog/wasm-compiler-in-a-tweet/
> won't be unraveling this for a long time
> it will involve applying a .flatmap and uint8array stuff
>

## Input

`````js filename=intro
// What happens to the split there?
let c=(b,l)=>WebAssembly.instantiate(new Int8Array(
[,97,115,109,1,,,,1,5,1,96,,1,127,3,2,1,,7,4,1,,,,10,
l=(b=b.split` `.flatMap(t=>t>-1?[65,t]:107+'-*/'.indexOf(t)))
.length+4,1,l-2,,...b,11]))
// usage
(/*await*/ c('11 11 1 - + 4 * 2 /')).instance.exports['']()
`````


## Settled


`````js filename=intro
const tmpCalleeParam$5 /*:(unknown)=>unknown*/ = function ($$0) {
  const t /*:unknown*/ = $$0;
  debugger;
  const tmpIfTest /*:boolean*/ = t > -1;
  if (tmpIfTest) {
    const tmpClusterSSA_tmpReturnArg$1 /*:array*/ = [65, t];
    return tmpClusterSSA_tmpReturnArg$1;
  } else {
    const tmpBinBothRhs /*:number*/ = `-*/`.indexOf(t);
    const tmpClusterSSA_tmpReturnArg$2 /*:number*/ = 107 + tmpBinBothRhs;
    return tmpClusterSSA_tmpReturnArg$2;
  }
};
const c /*:()=>unknown*/ = function () {
  debugger;
  const tmpCallObj$1 /*:unknown*/ = WebAssembly;
  const tmpCallVal /*:unknown*/ = tmpCallObj$1.instantiate;
  const tmpNewCallee /*:unknown*/ = Int8Array;
  const tmpCallObj$3 /*:array*/ = [`11`, `11`, `1`, `-`, `+`, `4`, `*`, `2`, `/`];
  const tmpClusterSSA_b /*:array*/ = tmpCallObj$3.flatMap(tmpCalleeParam$5);
  const tmpBinLhs /*:number*/ = tmpClusterSSA_b.length;
  const tmpClusterSSA_l /*:number*/ = tmpBinLhs + 4;
  const tmpArrElement$37 /*:number*/ = tmpClusterSSA_l - 2;
  const tmpCalleeParam$3 /*:array*/ = [
    ,
    97,
    115,
    109,
    1,
    ,
    ,
    ,
    1,
    5,
    1,
    96,
    ,
    1,
    127,
    3,
    2,
    1,
    ,
    7,
    4,
    1,
    ,
    ,
    ,
    10,
    tmpClusterSSA_l,
    1,
    tmpArrElement$37,
    ,
    ...tmpClusterSSA_b,
    11,
  ];
  const tmpCalleeParam$1 /*:object*/ = new tmpNewCallee(tmpCalleeParam$3);
  const tmpCallCallee /*:unknown*/ = $dotCall(tmpCallVal, tmpCallObj$1, `instantiate`, tmpCalleeParam$1);
  const tmpCalleeParam /*:unknown*/ = c();
  const tmpCompObj$1 /*:unknown*/ = tmpCallCallee(tmpCalleeParam);
  const tmpCompObj /*:unknown*/ = tmpCompObj$1.instance;
  const tmpCallObj /*:unknown*/ = tmpCompObj.exports;
  const tmpReturnArg /*:unknown*/ = tmpCallObj[``]();
  return tmpReturnArg;
};
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$5 = function (t) {
  if (t > -1) {
    const tmpClusterSSA_tmpReturnArg$1 = [65, t];
    return tmpClusterSSA_tmpReturnArg$1;
  } else {
    const tmpBinBothRhs = `-*/`.indexOf(t);
    const tmpClusterSSA_tmpReturnArg$2 = 107 + tmpBinBothRhs;
    return tmpClusterSSA_tmpReturnArg$2;
  }
};
const c = function () {
  const tmpCallObj$1 = WebAssembly;
  const tmpCallVal = tmpCallObj$1.instantiate;
  const tmpNewCallee = Int8Array;
  const tmpClusterSSA_b = [`11`, `11`, `1`, `-`, `+`, `4`, `*`, `2`, `/`].flatMap(tmpCalleeParam$5);
  const tmpClusterSSA_l = tmpClusterSSA_b.length + 4;
  const tmpArrElement$37 = tmpClusterSSA_l - 2;
  const tmpCalleeParam$3 = [
    ,
    97,
    115,
    109,
    1,
    ,
    ,
    ,
    1,
    5,
    1,
    96,
    ,
    1,
    127,
    3,
    2,
    1,
    ,
    7,
    4,
    1,
    ,
    ,
    ,
    10,
    tmpClusterSSA_l,
    1,
    tmpArrElement$37,
    ,
    ...tmpClusterSSA_b,
    11,
  ];
  const tmpCallCallee = $dotCall(tmpCallVal, tmpCallObj$1, `instantiate`, new tmpNewCallee(tmpCalleeParam$3));
  const tmpReturnArg = tmpCallCallee(c()).instance.exports[``]();
  return tmpReturnArg;
};
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = b > -1;
  if (c) {
    const d = [ 65, b ];
    return d;
  }
  else {
    const e = "-*/".indexOf( b );
    const f = 107 + e;
    return f;
  }
};
const g = function() {
  debugger;
  const h = WebAssembly;
  const i = h.instantiate;
  const j = Int8Array;
  const k = [ "11", "11", "1", "-", "+", "4", "*", "2", "/" ];
  const l = k.flatMap( a );
  const m = l.length;
  const n = m + 4;
  const o = n - 2;
  const p = [ ,, 97, 115, 109, 1, ,, ,, ,, 1, 5, 1, 96, ,, 1, 127, 3, 2, 1, ,, 7, 4, 1, ,, ,, ,, 10, n, 1, o, ,, ...l, 11 ];
  const q = new j( p );
  const r = $dotCall( i, h, "instantiate", q );
  const s = g();
  const t = r( s );
  const u = t.instance;
  const v = u.exports;
  const w = v[ "" ]();
  return w;
};
`````


## Todos triggered


- support $array_flatmap with arguments?


## Globals


BAD@! Found 2 implicit global bindings:

WebAssembly, Int8Array


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
