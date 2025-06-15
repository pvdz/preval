# Preval test case

# push_tdz_ident.md

> Array > Manipulation > Push > Push tdz ident
>
> Pushing an ident that is declared between array decl and push, should not lead to tdz

## Input

`````js filename=intro
const zarr = [`a`, `b`, `c`];
const tmpMCF = zarr.push;
const x = $(5);
let tmpCalleeParam = $dotCall(tmpMCF, zarr, `push`, x);
$(tmpCalleeParam);
$(zarr);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(5);
$(4);
const zarr /*:array*/ /*truthy*/ = [`a`, `b`, `c`, x];
$(zarr);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(5);
$(4);
$([`a`, `b`, `c`, x]);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
$( 4 );
const b = [ "a", "b", "c", a ];
$( b );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const zarr = [`a`, `b`, `c`];
const tmpMCF = zarr.push;
const x = $(5);
let tmpCalleeParam = $dotCall(tmpMCF, zarr, `push`, x);
$(tmpCalleeParam);
$(zarr);
$(x);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 4
 - 3: ['a', 'b', 'c', 5]
 - 4: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
