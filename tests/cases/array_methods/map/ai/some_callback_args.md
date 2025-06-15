# Preval test case

# some_callback_args.md

> Array methods > Map > Ai > Some callback args
>
> Test: Array.map callback arguments

## Input

`````js filename=intro
const x = [10,20].map(function(value, index, array) { $(value, index, array); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCOO /*:array*/ /*truthy*/ = [10, 20];
$(10, 0, tmpMCOO);
const tmpLambdaMapHas$1 /*:boolean*/ = 1 in tmpMCOO;
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [undefined];
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapVal$1 /*:primitive*/ = tmpMCOO[1];
  $(tmpLambdaMapVal$1, 1, tmpMCOO);
  tmpLambdaMapOut[1] = undefined;
} else {
}
tmpLambdaMapOut.length = 2;
$(tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = [10, 20];
$(10, 0, tmpMCOO);
const tmpLambdaMapHas$1 = 1 in tmpMCOO;
const tmpLambdaMapOut = [undefined];
if (tmpLambdaMapHas$1) {
  $(tmpMCOO[1], 1, tmpMCOO);
  tmpLambdaMapOut[1] = undefined;
}
tmpLambdaMapOut.length = 2;
$(tmpLambdaMapOut);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20 ];
$( 10, 0, a );
const b = 1 in a;
const c = [ undefined ];
if (b) {
  const d = a[ 1 ];
  $( d, 1, a );
  c[1] = undefined;
}
c.length = 2;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [10, 20];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function ($$0, $$1, $$2) {
  let value = $$0;
  let index = $$1;
  let array = $$2;
  debugger;
  $(value, index, array);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 0, [10, 20]
 - 2: 20, 1, [10, 20]
 - 3: [undefined, undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
