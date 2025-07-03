# Preval test case

# some_sparse_beginning.md

> Array methods > Some > Ai > Some sparse beginning
>
> Test: Array.some on sparse array with hole at beginning

## Input

`````js filename=intro
let arr = [,1,2];
const x = arr.some(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [, 1, 2];
const tmpMCF = arr.some;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `some`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
