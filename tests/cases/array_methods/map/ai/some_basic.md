# Preval test case

# some_basic.md

> Array methods > Map > Ai > Some basic
>
> Test: Array.map basic usage

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].map(function(x) { result.push(x); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [undefined, undefined, undefined];
$(result, tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3], [undefined, undefined, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = [ undefined, undefined, undefined ];
$( a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  [1, 2, 3],
  [undefined, undefined, undefined],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
