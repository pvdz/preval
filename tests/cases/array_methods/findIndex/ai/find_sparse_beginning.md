# Preval test case

# find_sparse_beginning.md

> Array methods > FindIndex > Ai > Find sparse beginning
>
> Test: Array.findIndex on sparse array with hole at beginning

## Input

`````js filename=intro
let arr = [,1,2];
const x = arr.findIndex(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
$(1);
$(2);
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(1);
$(2);
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 1 );
$( 2 );
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [, 1, 2];
const tmpMCF = arr.findIndex;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 1
 - 3: 2
 - 4: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
