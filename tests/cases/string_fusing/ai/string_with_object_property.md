# Preval test case

# string_with_object_property.md

> String fusing > Ai > String with object property
>
> Test string concatenation with object property access

## Input

`````js filename=intro
const obj = { prop: $("value") };
const result = "prefix" + obj.prop;
$(result);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`value`);
const tmpStringConcatL /*:string*/ = $coerce(tmpObjLitVal, `plustr`);
const result /*:string*/ /*truthy*/ = `prefix${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $(`value`) + ``;
$(`prefix${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "value" );
const b = $coerce( a, "plustr" );
const c = `prefix${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`value`);
const obj = { prop: tmpObjLitVal };
const tmpBinBothLhs = `prefix`;
const tmpBinBothRhs = obj.prop;
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'value'
 - 2: 'prefixvalue'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
