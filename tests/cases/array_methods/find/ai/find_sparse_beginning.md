# Preval test case

# find_sparse_beginning.md

> Array methods > Find > Ai > Find sparse beginning
>
> Test: Array.find on sparse array with hole at beginning

## Input

`````js filename=intro
let arr = [,1,2];
const x = arr.find(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
$(1);
$(2);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(1);
$(2);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 1 );
$( 2 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [, 1, 2];
const tmpMCF = arr.find;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `find`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) regular property access of an ident feels tricky;
- (todo) type trackeed tricks can possibly support static $array_find


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 1
 - 3: 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
