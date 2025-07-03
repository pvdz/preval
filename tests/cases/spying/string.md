# Preval test case

# string.md

> Spying > String
>
> Apply String to a spy

## Input

`````js filename=intro
$(String($spy()));

$(String($spy(1, 2)));

$(String($spy('x', 'y')));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $spy();
const tmpCalleeParam /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
$(tmpCalleeParam);
const tmpCalleeParam$5 /*:unknown*/ = $spy(1, 2);
const tmpCalleeParam$3 /*:string*/ = $coerce(tmpCalleeParam$5, `string`);
$(tmpCalleeParam$3);
const tmpCalleeParam$9 /*:unknown*/ = $spy(`x`, `y`);
const tmpCalleeParam$7 /*:string*/ = $coerce(tmpCalleeParam$9, `string`);
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(String($spy()));
$(String($spy(1, 2)));
$(String($spy(`x`, `y`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "string" );
$( b );
const c = $spy( 1, 2 );
const d = $coerce( c, "string" );
$( d );
const e = $spy( "x", "y" );
const f = $coerce( e, "string" );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = $spy();
let tmpCalleeParam = $coerce(tmpCalleeParam$1, `string`);
$(tmpCalleeParam);
let tmpCalleeParam$5 = $spy(1, 2);
let tmpCalleeParam$3 = $coerce(tmpCalleeParam$5, `string`);
$(tmpCalleeParam$3);
let tmpCalleeParam$9 = $spy(`x`, `y`);
let tmpCalleeParam$7 = $coerce(tmpCalleeParam$9, `string`);
$(tmpCalleeParam$7);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].toString()'
 - 3: 'spy'
 - 4: 'Creating spy', 2, 2, [1, 2]
 - 5: '$spy[2].toString()', 1
 - 6: '1'
 - 7: 'Creating spy', 3, 2, ['x', 'y']
 - 8: '$spy[3].toString()', 'x'
 - 9: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
