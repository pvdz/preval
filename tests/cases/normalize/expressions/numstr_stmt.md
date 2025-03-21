# Preval test case

# numstr_stmt.md

> Normalize > Expressions > Numstr stmt
>
> A statement that is a numstr coercion

I guess we have to keep it like this because coercing it to number may force-coerce something that doesn't need to be coerced.

## Input

`````js filename=intro
$spy() + '';
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $spy();
$coerce(tmpBinLhs, `plustr`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(), `plustr`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
$coerce( a, "plustr" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
