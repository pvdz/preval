# Preval test case

# some_callback_args.md

> Array methods > Some > Ai > Some callback args
>
> Test: Array.some callback arguments

## Input

`````js filename=intro
const x = [10,20].some(function(value, index, array) { $(value, index, array); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCOO /*:array*/ /*truthy*/ = [10, 20];
$(10, 0, tmpMCOO);
const tmpLambdaSomeHas$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpLambdaSomeHas$1) {
  const tmpLambdaSomeVal$1 /*:primitive*/ = tmpMCOO[1];
  $(tmpLambdaSomeVal$1, 1, tmpMCOO);
  $(false);
} else {
  $(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = [10, 20];
$(10, 0, tmpMCOO);
if (1 in tmpMCOO) {
  $(tmpMCOO[1], 1, tmpMCOO);
  $(false);
} else {
  $(false);
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
  $( false );
}
else {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [10, 20];
const tmpMCF = tmpMCOO.some;
const tmpMCP = function ($$0, $$1, $$2) {
  let value = $$0;
  let index = $$1;
  let array = $$2;
  debugger;
  $(value, index, array);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `some`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 0, [10, 20]
 - 2: 20, 1, [10, 20]
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
