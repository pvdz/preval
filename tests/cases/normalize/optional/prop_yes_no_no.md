# Preval test case

# prop_yes_no_no.md

> Normalize > Optional > Prop yes no no
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a?.b.c.d);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementObject$1.d;
$(tmpChainElementObject$3);
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
