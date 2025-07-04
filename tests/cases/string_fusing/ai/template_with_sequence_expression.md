# Preval test case

# template_with_sequence_expression.md

> String fusing > Ai > Template with sequence expression
>
> Test templates with sequence expressions that should not be resolved statically

## Input

`````js filename=intro
const a = $("first");
const b = $("second");
const template = `result: ${(a, b)}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
$(`first`);
const b /*:unknown*/ = $(`second`);
const tmpBinBothRhs /*:string*/ = $coerce(b, `string`);
const result /*:string*/ /*truthy*/ = `result: ${tmpBinBothRhs}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`first`);
$(`result: ${$(`second`)}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "first" );
const a = $( "second" );
const b = $coerce( a, "string" );
const c = `result: ${b}end`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`first`);
const b = $(`second`);
const tmpBinBothLhs = `result: `;
let tmpCalleeParam = b;
const tmpBinBothRhs = $coerce(b, `string`);
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
 - 1: 'first'
 - 2: 'second'
 - 3: 'result: secondend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
