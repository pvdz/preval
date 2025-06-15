# Preval test case

# some_sparse_multiple.md

> Array methods > Map > Ai > Some sparse multiple
>
> Test: Array.map on sparse array with multiple holes

## Input

`````js filename=intro
let arr = [1,,3,,5];
const x = arr.map(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(3);
$(5);
const tmpArreout /*:array*/ /*truthy*/ = [undefined, , undefined, , undefined];
$(tmpArreout);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
$(5);
$([undefined, , undefined, , undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( 5 );
const a = [ undefined, ,, undefined, ,, undefined ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, , 3, , 5];
const tmpMCF = arr.map;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `map`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 5
 - 4: [undefined, , undefined, , undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
