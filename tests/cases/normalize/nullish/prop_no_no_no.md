# Preval test case

# prop_no_no_no.md

> Normalize > Nullish > Prop no no no
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a.b.c.d);
`````


## Settled


`````js filename=intro
const tmpCompObj$1 /*:unknown*/ = $Object_prototype.b;
const tmpCompObj /*:unknown*/ = tmpCompObj$1.c;
const tmpCalleeParam /*:unknown*/ = tmpCompObj.d;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.b.c.d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b.d;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
