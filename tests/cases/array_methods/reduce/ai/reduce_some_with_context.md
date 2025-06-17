# Preval test case

# reduce_some_with_context.md

> Array methods > Reduce > Ai > Reduce some with context
>
> Test: Array.reduce with context

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].reduce(function(x) { result.push(x * this.mult); }, ctx);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unknown)=>undefined*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const x$1 /*:unknown*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasThis.mult;
  const tmpMCP$1 /*:number*/ = x$1 * tmpBinBothRhs;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpLambdaReduceOut /*:object*/ /*truthy*/ = { mult: 2 };
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
let tmpClusterSSA_tmpLambdaReduceOut /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, tmpLambdaReduceOut, 1, 0, tmpMCOO);
const tmpLambdaReduceHas$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpLambdaReduceHas$1) {
  const tmpLambdaReduceVal$1 /*:primitive*/ = tmpMCOO[1];
  tmpClusterSSA_tmpLambdaReduceOut = $dotCall(
    tmpMCP,
    undefined,
    undefined,
    tmpClusterSSA_tmpLambdaReduceOut,
    tmpLambdaReduceVal$1,
    1,
    tmpMCOO,
  );
} else {
}
const tmpLambdaReduceHas$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpLambdaReduceHas$2) {
  const tmpLambdaReduceVal$2 /*:primitive*/ = tmpMCOO[2];
  const tmpClusterSSA_tmpLambdaReduceOut$1 /*:unknown*/ = $dotCall(
    tmpMCP,
    undefined,
    undefined,
    tmpClusterSSA_tmpLambdaReduceOut,
    tmpLambdaReduceVal$2,
    2,
    tmpMCOO,
  );
  $(result, tmpClusterSSA_tmpLambdaReduceOut$1);
} else {
  $(result, tmpClusterSSA_tmpLambdaReduceOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function (x$1) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, x$1 * tmpPrevalAliasThis.mult);
};
const tmpLambdaReduceOut = { mult: 2 };
const tmpMCOO = [1, 2, 3];
let tmpClusterSSA_tmpLambdaReduceOut = $dotCall(tmpMCP, undefined, undefined, tmpLambdaReduceOut, 1, 0, tmpMCOO);
if (1 in tmpMCOO) {
  tmpClusterSSA_tmpLambdaReduceOut = $dotCall(tmpMCP, undefined, undefined, tmpClusterSSA_tmpLambdaReduceOut, tmpMCOO[1], 1, tmpMCOO);
}
if (2 in tmpMCOO) {
  $(result, $dotCall(tmpMCP, undefined, undefined, tmpClusterSSA_tmpLambdaReduceOut, tmpMCOO[2], 2, tmpMCOO));
} else {
  $(result, tmpClusterSSA_tmpLambdaReduceOut);
}
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
let i = $dotCall( b, undefined, undefined, g, 1, 0, h );
const j = 1 in h;
if (j) {
  const k = h[ 1 ];
  i = $dotCall( b, undefined, undefined, i, k, 1, h );
}
const l = 2 in h;
if (l) {
  const m = h[ 2 ];
  const n = $dotCall( b, undefined, undefined, i, m, 2, h );
  $( a, n );
}
else {
  $( a, i );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.reduce;
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
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
