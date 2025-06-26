# Preval test case

# math_with_sparse_array_map.md

> Math > Ai > Math with sparse array map
>
> Math.sqrt with sparse array and map

## Input

`````js filename=intro
const arr = [4, , 16];
const result = arr.map(Math.sqrt);
$(result[0]);
$(result[1]);
$(result[2]);
// Should be 2, undefined, 4
`````


## Settled


`````js filename=intro
$(2);
$(undefined);
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(undefined);
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( undefined );
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [4, , 16];
const tmpMCF = arr.map;
const tmpMCP = $Math_sqrt;
const result = $dotCall(tmpMCF, arr, `map`, $Math_sqrt);
let tmpCalleeParam = result[0];
$(tmpCalleeParam);
let tmpCalleeParam$1 = result[1];
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = result[2];
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) In some (many?) cases the array can access this value so we could move the rhs into the array...
- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Math_sqrt
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: undefined
 - 3: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
