# Preval test case

# spread_assign_after_alias.md

> Let aliases > Ai > Spread assign after alias
>
> Spread assignment to let after alias (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
[x] = ["changed"];
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpArrAssignPatternRhs = [`changed`];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
x = tmpArrPatternSplat[0];
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
