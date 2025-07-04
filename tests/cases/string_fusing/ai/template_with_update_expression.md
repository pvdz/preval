# Preval test case

# template_with_update_expression.md

> String fusing > Ai > Template with update expression
>
> Test templates with update expressions that should not be resolved statically

## Input

`````js filename=intro
let counter = 0;
const template = `count: ${++counter}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
$(`count: 1end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`count: 1end`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "count: 1end" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 0;
const tmpBinBothLhs = `count: `;
const tmpPostUpdArgIdent = $coerce(counter, `number`);
counter = tmpPostUpdArgIdent + 1;
let tmpCalleeParam = counter;
const tmpBinBothRhs = $coerce(counter, `string`);
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
 - 1: 'count: 1end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
