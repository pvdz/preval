# Preval test case

# complex_complex.md

> Normalize > Templates > Complex complex
>
> A template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ $(20) } def`);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(10);
const tmpBinBothRhs$1 /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam$3 /*:unknown*/ = $(20);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$3, `string`);
const tmpCalleeParam /*:string*/ = `abc ${tmpBinBothRhs$1} ${tmpBinBothRhs} def`;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs$1 = $coerce($(10), `string`);
const tmpBinBothRhs = $coerce($(20), `string`);
$(`abc ${tmpBinBothRhs$1} ${tmpBinBothRhs} def`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = $coerce( a, "string" );
const c = $( 20 );
const d = $coerce( c, "string" );
const e = `abc ${b} ${d} def`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs$1 = `abc `;
let tmpCalleeParam$1 = $(10);
const tmpBinBothRhs$1 = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR} `;
let tmpCalleeParam$3 = $(20);
const tmpBinBothRhs = $coerce(tmpCalleeParam$3, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR$1} def`;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
