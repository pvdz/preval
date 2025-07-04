# Preval test case

# template_with_member_expression.md

> String fusing > Ai > Template with member expression
>
> Test templates with member expressions that should not be resolved statically

## Input

`````js filename=intro
const obj = { nested: { value: $("deep") } };
const template = `value: ${obj.nested.value}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $(`deep`);
const tmpBinBothRhs /*:string*/ = $coerce(tmpObjLitVal$1, `string`);
const result /*:string*/ /*truthy*/ = `value: ${tmpBinBothRhs}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`value: ${$(`deep`)}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "deep" );
const b = $coerce( a, "string" );
const c = `value: ${b}end`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = $(`deep`);
const tmpObjLitVal = { value: tmpObjLitVal$1 };
const obj = { nested: tmpObjLitVal };
const tmpBinBothLhs = `value: `;
const tmpCompObj = obj.nested;
let tmpCalleeParam = tmpCompObj.value;
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
 - 1: 'deep'
 - 2: 'value: deepend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
