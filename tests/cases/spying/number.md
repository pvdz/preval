# Preval test case

# number.md

> Spying > Number
>
> Apply Number to a spy

## Input

`````js filename=intro
$(Number($spy()));

$(Number($spy(1, 2)));

$(Number($spy('x', 'y')));
`````


## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $spy();
const tmpCalleeParam /*:number*/ = $coerce(tmpStringFirstArg, `number`);
$(tmpCalleeParam);
const tmpStringFirstArg$1 /*:unknown*/ = $spy(1, 2);
const tmpCalleeParam$1 /*:number*/ = $coerce(tmpStringFirstArg$1, `number`);
$(tmpCalleeParam$1);
const tmpStringFirstArg$3 /*:unknown*/ = $spy(`x`, `y`);
const tmpCalleeParam$3 /*:number*/ = $coerce(tmpStringFirstArg$3, `number`);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($spy(), `number`));
$($coerce($spy(1, 2), `number`));
$($coerce($spy(`x`, `y`), `number`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "number" );
$( b );
const c = $spy( 1, 2 );
const d = $coerce( c, "number" );
$( d );
const e = $spy( "x", "y" );
const f = $coerce( e, "number" );
$( f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 12345
 - 4: 'Creating spy', 2, 2, [1, 2]
 - 5: '$spy[2].valueOf()', 2
 - 6: 2
 - 7: 'Creating spy', 3, 2, ['x', 'y']
 - 8: '$spy[3].valueOf()', 'y'
 - 9: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
