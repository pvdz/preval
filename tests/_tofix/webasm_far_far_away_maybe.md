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
const tmpMCP$3 /*:(unknown)=>unknown*/ = function ($$0) {
  const t /*:unknown*/ = $$0;
  debugger;
  const tmpIfTest /*:boolean*/ = t > -1;
  if (tmpIfTest) {
    const tmpClusterSSA_tmpReturnArg$1 /*:array*/ = [65, t];
    return tmpClusterSSA_tmpReturnArg$1;
  } else {
    const tmpBinBothRhs /*:number*/ = $dotCall($string_indexOf, `-*/`, `indexOf`, t);
    const tmpClusterSSA_tmpReturnArg$2 /*:number*/ = 107 + tmpBinBothRhs;
    return tmpClusterSSA_tmpReturnArg$2;
  }
};
const c /*:()=>unknown*/ = function () {
  debugger;
  const tmpMCF /*:unknown*/ = WebAssembly.instantiate;
  const tmpNewCallee /*:unknown*/ = Int8Array;
  const tmpMCOO$1 /*:array*/ = [`11`, `11`, `1`, `-`, `+`, `4`, `*`, `2`, `/`];
  const tmpClusterSSA_b /*:array*/ = $dotCall($array_flatMap, tmpMCOO$1, `flatMap`, tmpMCP$3);
  const tmpBinLhs /*:number*/ = tmpClusterSSA_b.length;
  const tmpClusterSSA_l /*:number*/ = tmpBinLhs + 4;
  const tmpArrElement$37 /*:number*/ = tmpClusterSSA_l - 2;
  const tmpCalleeParam /*:array*/ = [
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
  const tmpMCP /*:object*/ = new tmpNewCallee(tmpCalleeParam);
  const tmpCallComplexCallee /*:unknown*/ = $dotCall(tmpMCF, WebAssembly, `instantiate`, tmpMCP);
  const tmpCalleeParam$1 /*:unknown*/ = c();
  const tmpCompObj$1 /*:unknown*/ = tmpCallComplexCallee(tmpCalleeParam$1);
  const tmpCompObj /*:unknown*/ = tmpCompObj$1.instance;
  const tmpMCOO /*:unknown*/ = tmpCompObj.exports;
  const tmpMCF$7 /*:unknown*/ = tmpMCOO[``];
  const tmpReturnArg /*:unknown*/ = $dotCall(tmpMCF$7, tmpMCOO, undefined);
  return tmpReturnArg;
};
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP$3 = function (t) {
  if (t > -1) {
    const tmpClusterSSA_tmpReturnArg$1 = [65, t];
    return tmpClusterSSA_tmpReturnArg$1;
  } else {
    const tmpBinBothRhs = $dotCall($string_indexOf, `-*/`, `indexOf`, t);
    const tmpClusterSSA_tmpReturnArg$2 = 107 + tmpBinBothRhs;
    return tmpClusterSSA_tmpReturnArg$2;
  }
};
const c = function () {
  const tmpMCF = WebAssembly.instantiate;
  const tmpNewCallee = Int8Array;
  const tmpClusterSSA_b = $dotCall($array_flatMap, [`11`, `11`, `1`, `-`, `+`, `4`, `*`, `2`, `/`], `flatMap`, tmpMCP$3);
  const tmpClusterSSA_l = tmpClusterSSA_b.length + 4;
  const tmpArrElement$37 = tmpClusterSSA_l - 2;
  const tmpCalleeParam = [
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
  const tmpCallComplexCallee = $dotCall(tmpMCF, WebAssembly, `instantiate`, new tmpNewCallee(tmpCalleeParam));
  const tmpMCOO = tmpCallComplexCallee(c()).instance.exports;
  const tmpReturnArg = tmpMCOO[``]();
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
    const e = $dotCall( $string_indexOf, "-*/", "indexOf", b );
    const f = 107 + e;
    return f;
  }
};
const g = function() {
  debugger;
  const h = WebAssembly.instantiate;
  const i = Int8Array;
  const j = [ "11", "11", "1", "-", "+", "4", "*", "2", "/" ];
  const k = $dotCall( $array_flatMap, j, "flatMap", a );
  const l = k.length;
  const m = l + 4;
  const n = m - 2;
  const o = [ ,, 97, 115, 109, 1, ,, ,, ,, 1, 5, 1, 96, ,, 1, 127, 3, 2, 1, ,, 7, 4, 1, ,, ,, ,, 10, m, 1, n, ,, ...k, 11 ];
  const p = new i( o );
  const q = $dotCall( h, WebAssembly, "instantiate", p );
  const r = g();
  const s = q( r );
  const t = s.instance;
  const u = t.exports;
  const v = u[ "" ];
  const w = $dotCall( v, u, undefined );
  return w;
};
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_flatMap
- (todo) arr mutation may be able to inline this method: tmpMCF$3
- (todo) arr mutation may be able to inline this method: $array_flatMap
- (todo) support $array_flatmap with arguments?


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
