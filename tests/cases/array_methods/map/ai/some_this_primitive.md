# Preval test case

# some_this_primitive.md

> Array methods > Map > Ai > Some this primitive
>
> Test: Array.map with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].map(function(x) { $(this === 42); }, 42);
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const tmpLambdaMapNow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
const tmpLambdaMapNow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
const tmpLambdaMapNow$2 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [tmpLambdaMapNow, tmpLambdaMapNow$1, tmpLambdaMapNow$2];
$(tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
const tmpLambdaMapNow = $dotCall(tmpMCP, 42, undefined);
const tmpLambdaMapNow$1 = $dotCall(tmpMCP, 42, undefined);
const tmpLambdaMapNow$2 = $dotCall(tmpMCP, 42, undefined);
$([tmpLambdaMapNow, tmpLambdaMapNow$1, tmpLambdaMapNow$2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
const d = $dotCall( a, 42, undefined );
const e = $dotCall( a, 42, undefined );
const f = $dotCall( a, 42, undefined );
const g = [ d, e, f ];
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: [undefined, undefined, undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
