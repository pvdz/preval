# Preval test case

# dyn_prop_false.md

> Normalize > Member access > Dyn prop false
>
> Dynamic property access with ident-like string. This one is not an ident.

## Input

`````js filename=intro
const a = {};
$(a['false']);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $Object_prototype.false;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.false;
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
