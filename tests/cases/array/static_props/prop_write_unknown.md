# Preval test case

# prop_write_unknown.md

> Array > Static props > Prop write unknown
>
> Getting the length of an array can be tricky, and sometimes be done

We can't tell what happened to the array so we must bail on the inlining.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr[$(2)] = 10;
$(arr.length);
`````


## Settled


`````js filename=intro
const tmpAssignComMemLhsProp /*:unknown*/ = $(2);
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
arr[tmpAssignComMemLhsProp] = 10;
const tmpCalleeParam /*:number*/ = arr.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignComMemLhsProp = $(2);
const arr = [1, 2, 3];
arr[tmpAssignComMemLhsProp] = 10;
$(arr.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ 1, 2, 3 ];
b[a] = 10;
const c = b.length;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpAssignComMemLhsObj = arr;
const tmpAssignComMemLhsProp = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 10;
let tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) In some (many?) cases the array can access this value so we could move the rhs into the array...
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
