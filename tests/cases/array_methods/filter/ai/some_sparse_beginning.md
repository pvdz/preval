# Preval test case

# some_sparse_beginning.md

> Array methods > Filter > Ai > Some sparse beginning
>
> Test: Array.filter on sparse array with hole at beginning

## Input

`````js filename=intro
let arr = [,1,2];
const x = arr.filter(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpArreout /*:array*/ /*truthy*/ = [];
$(tmpArreout);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [, 1, 2];
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
 - 1: 1
 - 2: 2
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
