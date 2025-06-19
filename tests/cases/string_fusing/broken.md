# Preval test case

# broken.md

> String fusing > Broken
>
> Two non-constant templates should be fused together

## Input

`````js filename=intro
const unknownLeft = $coerce($('left'), `string`);
const unknownRight = $coerce($('right'), `string`);
const unknownRightTpl = `${unknownRight}me`;
const out = unknownLeft + unknownRightTpl;
$(out);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`left`);
const unknownLeft /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpCalleeParam$1 /*:unknown*/ = $(`right`);
const unknownRight /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const out /*:string*/ /*truthy*/ = `${unknownRight}${unknownLeft}me`;
$(out);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const unknownLeft = $coerce($(`left`), `string`);
$(`${$(`right`)}${unknownLeft}me`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "left" );
const b = $coerce( a, "string" );
const c = $( "right" );
const d = $coerce( c, "string" );
const e = `${d}${b}me`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`left`);
const unknownLeft = $coerce(tmpCalleeParam, `string`);
let tmpCalleeParam$1 = $(`right`);
const unknownRight = $coerce(tmpCalleeParam$1, `string`);
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(unknownRight, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const unknownRightTpl = `${tmpStringConcatR}me`;
const out = unknownLeft + unknownRightTpl;
$(out);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'left'
 - 2: 'right'
 - 3: 'leftrightme'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 -  1: 'left'
 -  2: 'right'
 - !3: 'rightleftme'
 -  eval returned: undefined

Denormalized calls: BAD!!
 -  1: 'left'
 -  2: 'right'
 - !3: 'rightleftme'
 -  eval returned: undefined
