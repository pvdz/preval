# Preval test case

# nested_multi.md

> Templates > Nested multi
>
> A nested template should be merged down

## Input

`````js filename=intro
const a = $('x');
const b = $('y');
// Single level
$(`A${a}B${b}C`);
// Multi level
$(`A${`A${a}B${b}C`}B${`A${a}B${b}C`}C`);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`x`);
const b /*:unknown*/ = $(`y`);
const tmpBinBothRhs$1 /*:string*/ = $coerce(a, `string`);
const tmpBinBothRhs /*:string*/ = $coerce(b, `string`);
const tmpCalleeParam /*:string*/ = `A${tmpBinBothRhs$1}B${tmpBinBothRhs}C`;
$(tmpCalleeParam);
const tmpStringConcatL$1 /*:string*/ = $coerce(a, `string`);
const tmpBinBothRhs$7 /*:string*/ = $coerce(b, `string`);
const tmpStringConcatL$5 /*:string*/ = $coerce(a, `string`);
const tmpBinBothRhs$11 /*:string*/ = $coerce(b, `string`);
const tmpCalleeParam$1 /*:string*/ = `AA${tmpStringConcatL$1}B${tmpBinBothRhs$7}CBA${tmpStringConcatL$5}B${tmpBinBothRhs$11}CC`;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`x`);
const b = $(`y`);
const tmpBinBothRhs$1 = $coerce(a, `string`);
const tmpBinBothRhs = $coerce(b, `string`);
$(`A${tmpBinBothRhs$1}B${tmpBinBothRhs}C`);
const tmpStringConcatL$1 = $coerce(a, `string`);
const tmpBinBothRhs$7 = $coerce(b, `string`);
const tmpStringConcatL$5 = $coerce(a, `string`);
const tmpBinBothRhs$11 = $coerce(b, `string`);
$(`AA${tmpStringConcatL$1}B${tmpBinBothRhs$7}CBA${tmpStringConcatL$5}B${tmpBinBothRhs$11}CC`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = $( "y" );
const c = $coerce( a, "string" );
const d = $coerce( b, "string" );
const e = `A${c}B${d}C`;
$( e );
const f = $coerce( a, "string" );
const g = $coerce( b, "string" );
const h = $coerce( a, "string" );
const i = $coerce( b, "string" );
const j = `AA${f}B${g}CBA${h}B${i}CC`;
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`x`);
const b = $(`y`);
const tmpBinBothLhs$1 = `A`;
const tmpBinBothRhs$1 = $coerce(a, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR}B`;
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR$1}C`;
$(tmpCalleeParam);
const tmpBinBothLhs$5 = `A`;
const tmpBinBothLhs$9 = `A`;
const tmpBinBothRhs$9 = $coerce(a, `string`);
const tmpBinLhs$9 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
const tmpStringConcatR$3 = $coerce(tmpBinLhs$9, `plustr`);
const tmpBinBothLhs$7 = `${tmpStringConcatR$3}B`;
const tmpBinBothRhs$7 = $coerce(b, `string`);
const tmpBinLhs$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpStringConcatR$5 = $coerce(tmpBinLhs$7, `plustr`);
let tmpCalleeParam$3 = `${tmpStringConcatR$5}C`;
const tmpBinBothRhs$5 = $coerce(tmpCalleeParam$3, `string`);
const tmpBinLhs$5 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
const tmpStringConcatR$7 = $coerce(tmpBinLhs$5, `plustr`);
const tmpBinBothLhs$3 = `${tmpStringConcatR$7}B`;
const tmpBinBothLhs$13 = `A`;
const tmpBinBothRhs$13 = $coerce(a, `string`);
const tmpBinLhs$13 = tmpBinBothLhs$13 + tmpBinBothRhs$13;
const tmpStringConcatR$9 = $coerce(tmpBinLhs$13, `plustr`);
const tmpBinBothLhs$11 = `${tmpStringConcatR$9}B`;
const tmpBinBothRhs$11 = $coerce(b, `string`);
const tmpBinLhs$11 = tmpBinBothLhs$11 + tmpBinBothRhs$11;
const tmpStringConcatR$11 = $coerce(tmpBinLhs$11, `plustr`);
let tmpCalleeParam$5 = `${tmpStringConcatR$11}C`;
const tmpBinBothRhs$3 = $coerce(tmpCalleeParam$5, `string`);
const tmpBinLhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const tmpStringConcatR$13 = $coerce(tmpBinLhs$3, `plustr`);
let tmpCalleeParam$1 = `${tmpStringConcatR$13}C`;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - 3: 'AxByC'
 - 4: 'AAxByCBAxByCC'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
