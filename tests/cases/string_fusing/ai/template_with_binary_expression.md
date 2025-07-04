# Preval test case

# template_with_binary_expression.md

> String fusing > Ai > Template with binary expression
>
> Test templates with binary expressions that should not be resolved statically

## Input

`````js filename=intro
const a = $("5");
const b = $("3");
const template = `result: ${a + b}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`5`);
const b /*:unknown*/ = $(`3`);
const tmpCalleeParam /*:primitive*/ = a + b;
const result /*:string*/ /*truthy*/ = `result: ${tmpCalleeParam}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`5`) + $(`3`);
$(`result: ${tmpCalleeParam}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "5" );
const b = $( "3" );
const c = a + b;
const d = `result: ${c}end`;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`5`);
const b = $(`3`);
const tmpBinBothLhs = `result: `;
let tmpCalleeParam = a + b;
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const template = $coerce(tmpBinLhs, `plustr`);
const tmpStringConcatR = $coerce(template, `plustr`);
const result = `${tmpStringConcatR}end`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '5'
 - 2: '3'
 - 3: 'result: 53end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
