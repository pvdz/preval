# Preval test case

# numbers.md

> Coerce > Numbers
>
>

## Input

`````js filename=intro
const a = Number($spy(1));
const b = Number($spy(2));
$(`${a}${b}`);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(1);
const a /*:number*/ = $coerce(tmpCalleeParam, `number`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(2);
const b /*:number*/ = $coerce(tmpCalleeParam$1, `number`);
const tmpCalleeParam$3 /*:string*/ = `${a}${b}`;
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = Number($spy(1));
const b = Number($spy(2));
$(`${a}${b}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 1 );
const b = $coerce( a, "number" );
const c = $spy( 2 );
const d = $coerce( c, "number" );
const e = `${b}${d}`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $spy(1);
const a = $coerce(tmpCalleeParam, `number`);
let tmpCalleeParam$1 = $spy(2);
const b = $coerce(tmpCalleeParam$1, `number`);
const tmpBinBothLhs$1 = ``;
const tmpBinBothRhs$1 = $coerce(a, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let tmpCalleeParam$3 = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1, 1]
 - 2: '$spy[1].valueOf()', 1
 - 3: 'Creating spy', 2, 1, [2, 2]
 - 4: '$spy[2].valueOf()', 2
 - 5: '12'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
