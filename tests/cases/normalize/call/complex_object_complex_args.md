# Preval test case

# complex_object_complex_args.md

> Normalize > Call > Complex object complex args
>
> Calls should have simple objects

## Input

`````js filename=intro
const a = {b: $};
$(a).b($(1), $(2));
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { b: $ };
const tmpMCOO /*:unknown*/ = $(a);
const tmpMCF /*:unknown*/ = tmpMCOO.b;
const tmpMCP /*:unknown*/ = $(1);
const tmpMCP$1 /*:unknown*/ = $(2);
$dotCall(tmpMCF, tmpMCOO, `b`, tmpMCP, tmpMCP$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = $({ b: $ });
tmpMCOO.b($(1), $(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = b.b;
const d = $( 1 );
const e = $( 2 );
$dotCall( c, b, "b", d, e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = { b: $ };
const tmpMCOO = $(a);
const tmpMCF = tmpMCOO.b;
const tmpMCP = $(1);
const tmpMCP$1 = $(2);
$dotCall(tmpMCF, tmpMCOO, `b`, tmpMCP, tmpMCP$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
