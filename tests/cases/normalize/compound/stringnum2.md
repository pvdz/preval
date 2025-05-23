# Preval test case

# stringnum2.md

> Normalize > Compound > Stringnum2
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

## Input

`````js filename=intro
const sp = $spy();
$('b' + sp);
const sp2 = $spy();
$(`b${sp2}`);
`````


## Settled


`````js filename=intro
const sp /*:unknown*/ = $spy();
const tmpStringConcatL /*:string*/ = $coerce(sp, `plustr`);
const tmpCalleeParam /*:string*/ = `b${tmpStringConcatL}`;
$(tmpCalleeParam);
const sp2 /*:unknown*/ = $spy();
const tmpBinBothRhs /*:string*/ = $coerce(sp2, `string`);
const tmpCalleeParam$1 /*:string*/ = `b${tmpBinBothRhs}`;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $coerce($spy(), `plustr`);
$(`b${tmpStringConcatL}`);
$(`b${$spy()}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "plustr" );
const c = `b${b}`;
$( c );
const d = $spy();
const e = $coerce( d, "string" );
const f = `b${e}`;
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const sp = $spy();
const tmpStringConcatL = $coerce(sp, `plustr`);
let tmpCalleeParam = `b${tmpStringConcatL}`;
$(tmpCalleeParam);
const sp2 = $spy();
const tmpBinBothLhs = `b`;
const tmpBinBothRhs = $coerce(sp2, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let tmpCalleeParam$1 = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 'b12345'
 - 4: 'Creating spy', 2, 0, ['spy', 12345]
 - 5: '$spy[2].toString()'
 - 6: 'bspy'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
