# Preval test case

# foreach_callback_args.md

> Array methods > Foreach > Ai > Foreach callback args
>
> Test: Array.forEach callback arguments

## Input

`````js filename=intro
// Input: [10,20].forEach(fn)
// Expected: fn receives value, index, array
[10,20].forEach(function(value, index, array) { $(value, index, array); });
`````


## Settled


`````js filename=intro
const tmpMCOO /*:array*/ /*truthy*/ = [10, 20];
$(10, 0, tmpMCOO);
const tmpLambdaForeachCounterHas$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpLambdaForeachCounterHas$1) {
  const tmpLambdaForeachCounterVal$1 /*:primitive*/ = tmpMCOO[1];
  $(tmpLambdaForeachCounterVal$1, 1, tmpMCOO);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = [10, 20];
$(10, 0, tmpMCOO);
if (1 in tmpMCOO) {
  $(tmpMCOO[1], 1, tmpMCOO);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20 ];
$( 10, 0, a );
const b = 1 in a;
if (b) {
  const c = a[ 1 ];
  $( c, 1, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [10, 20];
const tmpMCF = tmpMCOO.forEach;
const tmpMCP = function ($$0, $$1, $$2) {
  let value = $$0;
  let index = $$1;
  let array = $$2;
  debugger;
  $(value, index, array);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 0, [10, 20]
 - 2: 20, 1, [10, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
