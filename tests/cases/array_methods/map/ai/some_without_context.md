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
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpLambdaMapNow /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
const tmpLambdaMapNow$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
const tmpLambdaMapNow$2 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [tmpLambdaMapNow, tmpLambdaMapNow$1, tmpLambdaMapNow$2];
$(result, tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
const tmpLambdaMapNow = $dotCall(tmpMCP, undefined, undefined);
const tmpLambdaMapNow$1 = $dotCall(tmpMCP, undefined, undefined);
const tmpLambdaMapNow$2 = $dotCall(tmpMCP, undefined, undefined);
$(result, [tmpLambdaMapNow, tmpLambdaMapNow$1, tmpLambdaMapNow$2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function() {
  const c = this;
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = $dotCall( b, undefined, undefined );
const f = $dotCall( b, undefined, undefined );
const g = $dotCall( b, undefined, undefined );
const h = [ e, f, g ];
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
