# Preval test case

# reduce_some_callback_args.md

> Array methods > Reduce > Ai > Reduce some callback args
>
> Test: Array.reduce callback arguments

## Input

`````js filename=intro
const x = [10,20].reduce(function(value, index, array) { $(value, index, array); });
$(x);
`````


## Settled


`````js filename=intro
$(10, 20, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10, 20, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10, 20, 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [10, 20];
const tmpMCF = tmpMCOO.reduce;
const tmpMCP = function ($$0, $$1, $$2) {
  let value = $$0;
  let index = $$1;
  let array = $$2;
  debugger;
  $(value, index, array);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 20, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
