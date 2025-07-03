# Preval test case

# every_callback_args.md

> Array methods > Every > Ai > Every callback args
>
> Test: Array.every callback arguments

## Input

`````js filename=intro
const x = [10,20].every(function(value, index, array) { $(value, index, array); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCOO /*:array*/ /*truthy*/ = [10, 20];
$(10, 0, tmpMCOO);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10, 0, [10, 20]);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20 ];
$( 10, 0, a );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [10, 20];
const tmpMCF = tmpMCOO.every;
const tmpMCP = function ($$0, $$1, $$2) {
  let value = $$0;
  let index = $$1;
  let array = $$2;
  debugger;
  $(value, index, array);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `every`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 0, [10, 20]
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
