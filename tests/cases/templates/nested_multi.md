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
const tmpBinBothRhs$9 /*:string*/ = $coerce(a, `string`);
const tmpBinBothRhs$7 /*:string*/ = $coerce(b, `string`);
const tmpBinBothRhs$13 /*:string*/ = $coerce(a, `string`);
const tmpBinBothRhs$11 /*:string*/ = $coerce(b, `string`);
const tmpCalleeParam$1 /*:string*/ = `AA${tmpBinBothRhs$9}B${tmpBinBothRhs$7}CBA${tmpBinBothRhs$13}B${tmpBinBothRhs$11}CC`;
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
const tmpBinBothRhs$9 = $coerce(a, `string`);
const tmpBinBothRhs$7 = $coerce(b, `string`);
const tmpBinBothRhs$13 = $coerce(a, `string`);
const tmpBinBothRhs$11 = $coerce(b, `string`);
$(`AA${tmpBinBothRhs$9}B${tmpBinBothRhs$7}CBA${tmpBinBothRhs$13}B${tmpBinBothRhs$11}CC`);
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
