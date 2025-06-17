# Preval test case

# some_without_context.md

> Array methods > Map > Ai > Some without context
>
> Test: Array.map without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].map(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unused)=>undefined*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpLambdaMapNow /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, 1, 0, tmpMCOO);
const tmpLambdaMapHas$1 /*:boolean*/ = 1 in tmpMCOO;
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [tmpLambdaMapNow];
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapVal$1 /*:primitive*/ = tmpMCOO[1];
  const tmpLambdaMapNow$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, tmpLambdaMapVal$1, 1, tmpMCOO);
  tmpLambdaMapOut[1] = tmpLambdaMapNow$1;
} else {
}
const tmpLambdaMapHas$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpLambdaMapHas$2) {
  const tmpLambdaMapVal$2 /*:primitive*/ = tmpMCOO[2];
  const tmpLambdaMapNow$2 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, tmpLambdaMapVal$2, 2, tmpMCOO);
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
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
const tmpMCOO = [1, 2, 3];
const tmpLambdaMapNow = $dotCall(tmpMCP, undefined, undefined, 1, 0, tmpMCOO);
const tmpLambdaMapHas$1 = 1 in tmpMCOO;
const tmpLambdaMapOut = [tmpLambdaMapNow];
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapNow$1 = $dotCall(tmpMCP, undefined, undefined, tmpMCOO[1], 1, tmpMCOO);
  tmpLambdaMapOut[1] = tmpLambdaMapNow$1;
}
if (2 in tmpMCOO) {
  const tmpLambdaMapNow$2 = $dotCall(tmpMCP, undefined, undefined, tmpMCOO[2], 2, tmpMCOO);
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
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = [ 1, 2, 3 ];
const f = $dotCall( b, undefined, undefined, 1, 0, e );
const g = 1 in e;
const h = [ f ];
if (g) {
  const i = e[ 1 ];
  const j = $dotCall( b, undefined, undefined, i, 1, e );
  h[1] = j;
}
const k = 2 in e;
if (k) {
  const l = e[ 2 ];
  const m = $dotCall( b, undefined, undefined, l, 2, e );
  h[2] = m;
}
h.length = 3;
$( a, h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
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
  [true, true, true],
  [undefined, undefined, undefined],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
