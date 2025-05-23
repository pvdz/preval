# Preval test case

# plus_str.md

> Spying > Plus str
>
> A spy in a plus

## Input

`````js filename=intro
$($spy() + '');
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $spy();
const tmpCalleeParam /*:string*/ = $coerce(tmpBinLhs, `plustr`);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = $spy();
let tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
