# Preval test case

# ident.md

> Array > Read only > Ident
>
> Arrays where it only reads properties

## Input

`````js filename=intro
const arr = [1, $, 3, 4];
$(arr[1]);
$(arr[3]);
$(`${arr[2]}xyz`);
`````


## Settled


`````js filename=intro
$($);
$(4);
$(`3xyz`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($);
$(4);
$(`3xyz`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $ );
$( 4 );
$( "3xyz" );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) can we always safely clone ident refs in this case?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 4
 - 3: '3xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
