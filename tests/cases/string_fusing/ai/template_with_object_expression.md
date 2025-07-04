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
const tmpObjLitVal /*:unknown*/ = $(`value`);
const obj /*:object*/ /*truthy*/ = { key: tmpObjLitVal };
const tmpBinBothRhs /*:string*/ = $coerce(obj, `string`);
const result /*:string*/ /*truthy*/ = `object: ${tmpBinBothRhs}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(`value`);
$(`object: ${{ key: tmpObjLitVal }}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "value" );
const b = { key: a };
const c = $coerce( b, "string" );
const d = `object: ${c}end`;
$( d );
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
