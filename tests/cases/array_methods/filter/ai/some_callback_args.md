# Preval test case

# some_callback_args.md

> Array methods > Filter > Ai > Some callback args
>
> Test: Array.filter callback arguments

## Input

`````js filename=intro
const x = [10,20].filter(function(value, index, array) { $(value, index, array); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCOO /*:array*/ /*truthy*/ = [10, 20];
$(10, 0, tmpMCOO);
const tmpLambdaFilterHas$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpLambdaFilterHas$1) {
  const tmpLambdaFilterVal$1 /*:primitive*/ = tmpMCOO[1];
  $(tmpLambdaFilterVal$1, 1, tmpMCOO);
} else {
}
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
$(tmpLambdaFilterOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = [10, 20];
$(10, 0, tmpMCOO);
if (1 in tmpMCOO) {
  $(tmpMCOO[1], 1, tmpMCOO);
}
$([]);
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
const d = [];
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [10, 20];
const tmpMCF = tmpMCOO.filter;
const tmpMCP = function ($$0, $$1, $$2) {
  let value = $$0;
  let index = $$1;
  let array = $$2;
  debugger;
  $(value, index, array);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `filter`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 0, [10, 20]
 - 2: 20, 1, [10, 20]
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
