# Preval test case

# str_plus.md

> Spying > Str plus
>
> A spy in a plus

## Input

`````js filename=intro
$('' + $spy());
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $spy();
const tmpCalleeParam /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($spy(), `plustr`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "plustr" );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '12345'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
