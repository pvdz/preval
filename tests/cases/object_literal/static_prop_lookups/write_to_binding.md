# Preval test case

# write_to_binding.md

> Object literal > Static prop lookups > Write to binding
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
let o = {x: $(1)};
o = {}
$(o.x);
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $Object_prototype.x;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($Object_prototype.x);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $Object_prototype.x;
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
