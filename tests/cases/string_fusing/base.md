# Preval test case

# base.md

> String fusing > Base
>
> Two non-constant templates should be fused together

## Input

`````js filename=intro
const a = String($('a'));
const b = String($('a'));
const left = `[${a}]`;
const right = `[${b}]`;
$(left + right);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`a`);
const a /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpCalleeParam$1 /*:unknown*/ = $(`a`);
const b /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam$3 /*:string*/ /*truthy*/ = `[${a}][${b}]`;
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = String($(`a`));
const b = String($(`a`));
$(`[${a}][${b}]`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $coerce( a, "string" );
const c = $( "a" );
const d = $coerce( c, "string" );
const e = `[${b}][${d}]`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`a`);
const a = $coerce(tmpCalleeParam, `string`);
let tmpCalleeParam$1 = $(`a`);
const b = $coerce(tmpCalleeParam$1, `string`);
const tmpBinBothLhs = `[`;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const left = `${tmpStringConcatR}]`;
const tmpBinBothLhs$1 = `[`;
const tmpBinBothRhs$1 = $coerce(b, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR$1 = $coerce(tmpBinLhs$1, `plustr`);
const right = `${tmpStringConcatR$1}]`;
let tmpCalleeParam$3 = left + right;
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: '[a][a]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
