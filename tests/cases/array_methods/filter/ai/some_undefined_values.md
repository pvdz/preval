# Preval test case

# some_undefined_values.md

> Array methods > Filter > Ai > Some undefined values
>
> Test: Array.filter on array with undefined values

## Input

`````js filename=intro
let arr = [undefined,2,undefined];
const x = arr.filter(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
$(2);
$(undefined);
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
$(tmpLambdaFilterOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(2);
$(undefined);
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 2 );
$( undefined );
const a = [];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [undefined, 2, undefined];
const tmpMCF = arr.filter;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `filter`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 2
 - 3: undefined
 - 4: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
