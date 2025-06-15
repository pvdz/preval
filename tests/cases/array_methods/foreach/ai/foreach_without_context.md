# Preval test case

# foreach_without_context.md

> Array methods > Foreach > Ai > Foreach without context
>
> Test: Array.forEach without context

## Input

`````js filename=intro
// Input: [1,2,3].forEach(fn)
// Expected: this is undefined (in strict mode)
let result = [];
[1,2,3].forEach(function(x) { result.push(this === undefined); });
$(result);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
$dotCall(tmpMCP, undefined, undefined, 1, 0, tmpMCOO);
const tmpLambdaForeachCounterHas$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpLambdaForeachCounterHas$1) {
  const tmpLambdaForeachCounterVal$1 /*:primitive*/ = tmpMCOO[1];
  $dotCall(tmpMCP, undefined, undefined, tmpLambdaForeachCounterVal$1, 1, tmpMCOO);
} else {
}
const tmpLambdaForeachCounterHas$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpLambdaForeachCounterHas$2) {
  const tmpLambdaForeachCounterVal$2 /*:primitive*/ = tmpMCOO[2];
  $dotCall(tmpMCP, undefined, undefined, tmpLambdaForeachCounterVal$2, 2, tmpMCOO);
  $(result);
} else {
  $(result);
}
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
$dotCall(tmpMCP, undefined, undefined, 1, 0, tmpMCOO);
if (1 in tmpMCOO) {
  $dotCall(tmpMCP, undefined, undefined, tmpMCOO[1], 1, tmpMCOO);
}
if (2 in tmpMCOO) {
  $dotCall(tmpMCP, undefined, undefined, tmpMCOO[2], 2, tmpMCOO);
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
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = [ 1, 2, 3 ];
$dotCall( b, undefined, undefined, 1, 0, e );
const f = 1 in e;
if (f) {
  const g = e[ 1 ];
  $dotCall( b, undefined, undefined, g, 1, e );
}
const h = 2 in e;
if (h) {
  const i = e[ 2 ];
  $dotCall( b, undefined, undefined, i, 2, e );
  $( a );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.forEach;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true, true]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
