# Preval test case

# foreach_with_context.md

> Array methods > Foreach > Ai > Foreach with context
>
> Test: Array.forEach with context

## Input

`````js filename=intro
// Input: [1,2,3].forEach(fn, ctx) where ctx is {mult: 2}
// Expected: fn called with correct this
let ctx = {mult: 2};
let result = [];
[1,2,3].forEach(function(x) { result.push(x * this.mult); }, ctx);
$(result);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unknown)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasThis.mult;
  const tmpMCP$1 /*:number*/ = x * tmpBinBothRhs;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const ctx /*:object*/ /*truthy*/ = { mult: 2 };
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
$dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
const tmpArrin$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpArrin$1) {
  const tmpArrel$1 /*:primitive*/ = tmpMCOO[1];
  $dotCall(tmpMCP, ctx, undefined, tmpArrel$1, 1, tmpMCOO);
} else {
}
const tmpArrin$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpArrin$2) {
  const tmpArrel$2 /*:primitive*/ = tmpMCOO[2];
  $dotCall(tmpMCP, ctx, undefined, tmpArrel$2, 2, tmpMCOO);
  $(result);
} else {
  $(result);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function (x) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, x * tmpPrevalAliasThis.mult);
};
const ctx = { mult: 2 };
const tmpMCOO = [1, 2, 3];
$dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
if (1 in tmpMCOO) {
  $dotCall(tmpMCP, ctx, undefined, tmpMCOO[1], 1, tmpMCOO);
}
if (2 in tmpMCOO) {
  $dotCall(tmpMCP, ctx, undefined, tmpMCOO[2], 2, tmpMCOO);
  $(result);
} else {
  $(result);
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
$dotCall( b, g, undefined, 1, 0, h );
const i = 1 in h;
if (i) {
  const j = h[ 1 ];
  $dotCall( b, g, undefined, j, 1, h );
}
const k = 2 in h;
if (k) {
  const l = h[ 2 ];
  $dotCall( b, g, undefined, l, 2, h );
  $( a );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.forEach;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpBinBothLhs = x;
  const tmpBinBothRhs = tmpPrevalAliasThis.mult;
  const tmpMCP$1 = tmpBinBothLhs * tmpBinBothRhs;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP, ctx);
$(result);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 4, 6]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
