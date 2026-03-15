# Preval test case

# template_with_object_expression.md

> String fusing > Ai > Template with object expression
>
> Test templates with object expressions that should not be resolved statically

## Input

`````js filename=intro
const obj = { key: $("value") };
const template = `object: ${obj}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
$(`value`);
$(`object: [object Object]end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`value`);
$(`object: [object Object]end`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "value" );
$( "object: [object Object]end" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`value`);
const obj = { key: tmpObjLitVal };
const tmpBinBothLhs = `object: `;
const tmpBinBothRhs = $coerce(obj, `string`);
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
 - 1: 'value'
 - 2: 'object: [object Object]end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
