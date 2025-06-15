# Preval test case

# some_with_context.md

> Array methods > Map > Ai > Some with context
>
> Test: Array.map with context

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].map(function(x) { result.push(x * this.mult); }, ctx);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unknown)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const x$1 /*:unknown*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasThis.mult;
  const tmpMCP$1 /*:number*/ = x$1 * tmpBinBothRhs;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const ctx /*:object*/ /*truthy*/ = { mult: 2 };
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpLambdaMapNow /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
const tmpLambdaMapHas$1 /*:boolean*/ = 1 in tmpMCOO;
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [tmpLambdaMapNow];
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapVal$1 /*:primitive*/ = tmpMCOO[1];
  const tmpLambdaMapNow$1 /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, tmpLambdaMapVal$1, 1, tmpMCOO);
  tmpLambdaMapOut[1] = tmpLambdaMapNow$1;
} else {
}
const tmpLambdaMapHas$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpLambdaMapHas$2) {
  const tmpLambdaMapVal$2 /*:primitive*/ = tmpMCOO[2];
  const tmpLambdaMapNow$2 /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, tmpLambdaMapVal$2, 2, tmpMCOO);
  tmpLambdaMapOut[2] = tmpLambdaMapNow$2;
} else {
}
tmpLambdaMapOut.length = 3;
$(result, tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function (x$1) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, x$1 * tmpPrevalAliasThis.mult);
};
const ctx = { mult: 2 };
const tmpMCOO = [1, 2, 3];
const tmpLambdaMapNow = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
const tmpLambdaMapHas$1 = 1 in tmpMCOO;
const tmpLambdaMapOut = [tmpLambdaMapNow];
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapNow$1 = $dotCall(tmpMCP, ctx, undefined, tmpMCOO[1], 1, tmpMCOO);
  tmpLambdaMapOut[1] = tmpLambdaMapNow$1;
}
if (2 in tmpMCOO) {
  const tmpLambdaMapNow$2 = $dotCall(tmpMCP, ctx, undefined, tmpMCOO[2], 2, tmpMCOO);
  tmpLambdaMapOut[2] = tmpLambdaMapNow$2;
}
tmpLambdaMapOut.length = 3;
$(result, tmpLambdaMapOut);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function($$0 ) {
  const c = this;
  const d = $$0;
  debugger;
  const e = c.mult;
  const f = d * e;
  $dotCall( $array_push, a, "push", f );
  return undefined;
};
const g = { mult: 2 };
const h = [ 1, 2, 3 ];
const i = $dotCall( b, g, undefined, 1, 0, h );
const j = 1 in h;
const k = [ i ];
if (j) {
  const l = h[ 1 ];
  const m = $dotCall( b, g, undefined, l, 1, h );
  k[1] = m;
}
const n = 2 in h;
if (n) {
  const o = h[ 2 ];
  const p = $dotCall( b, g, undefined, o, 2, h );
  k[2] = p;
}
k.length = 3;
$( a, k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpBinBothLhs = x$1;
  const tmpBinBothRhs = tmpPrevalAliasThis.mult;
  const tmpMCP$1 = tmpBinBothLhs * tmpBinBothRhs;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  [2, 4, 6],
  [undefined, undefined, undefined],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
