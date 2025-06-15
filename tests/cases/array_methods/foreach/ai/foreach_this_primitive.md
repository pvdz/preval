# Preval test case

# foreach_this_primitive.md

> Array methods > Foreach > Ai > Foreach this primitive
>
> Test: Array.forEach with thisArg as primitive (number)

## Input

`````js filename=intro
// Input: [1,2,3].forEach(fn, 42)
// Expected: this is 42 (boxed)
[1,2,3].forEach(function(x) { $(this === 42); }, 42);
`````


## Settled


`````js filename=intro
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
$dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO);
const tmpLambdaForeachCounterHas$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpLambdaForeachCounterHas$1) {
  const tmpLambdaForeachCounterVal$1 /*:primitive*/ = tmpMCOO[1];
  $dotCall(tmpMCP, 42, undefined, tmpLambdaForeachCounterVal$1, 1, tmpMCOO);
} else {
}
const tmpLambdaForeachCounterHas$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpLambdaForeachCounterHas$2) {
  const tmpLambdaForeachCounterVal$2 /*:primitive*/ = tmpMCOO[2];
  $dotCall(tmpMCP, 42, undefined, tmpLambdaForeachCounterVal$2, 2, tmpMCOO);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
const tmpMCOO = [1, 2, 3];
$dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO);
if (1 in tmpMCOO) {
  $dotCall(tmpMCP, 42, undefined, tmpMCOO[1], 1, tmpMCOO);
}
if (2 in tmpMCOO) {
  $dotCall(tmpMCP, 42, undefined, tmpMCOO[2], 2, tmpMCOO);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
const d = [ 1, 2, 3 ];
$dotCall( a, 42, undefined, 1, 0, d );
const e = 1 in d;
if (e) {
  const f = d[ 1 ];
  $dotCall( a, 42, undefined, f, 1, d );
}
const g = 2 in d;
if (g) {
  const h = d[ 2 ];
  $dotCall( a, 42, undefined, h, 2, d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.forEach;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP, 42);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


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
