# Preval test case

# some_mutation_pop.md

> Array methods > Map > Ai > Some mutation pop
>
> Test: Array.map with pop during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
let result = [];
const x = arr.map(function(x) { result.push(x); arr.pop(); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [1, 2];
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [undefined, undefined, ,];
$(result, tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2], [undefined, undefined, ,]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = [ undefined, undefined, , ];
$( a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
let result = [];
const tmpMCF = arr.map;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  const tmpMCF$3 = arr.pop;
  $dotCall(tmpMCF$3, arr, `pop`);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `map`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_pop
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) fixme: spyless vars and labeled nodes
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_map
- (todo) type trackeed tricks can possibly support static $array_pop


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  [1, 2],
  [undefined, undefined],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
