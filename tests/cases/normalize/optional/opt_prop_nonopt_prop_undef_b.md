# Preval test case

# opt_prop_nonopt_prop_undef_b.md

> Normalize > Optional > Opt prop nonopt prop undef b
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {};
$(a?.b.c);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
$(tmpChainElementObject$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.b.c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
$( b );
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
