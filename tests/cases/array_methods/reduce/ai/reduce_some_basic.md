# Preval test case

# reduce_some_basic.md

> Array methods > Reduce > Ai > Reduce some basic
>
> Test: Array.reduce basic usage

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].reduce(function(x) { result.push(x); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [1, undefined];
$(result, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, undefined], undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, undefined ];
$( a, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.reduce;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, undefined], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
