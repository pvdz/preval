# Preval test case

# template_with_complex_right.md

> String fusing > Ai > Template with complex right
>
> Test template literal concatenation with complex expression to trigger leftMbt/rightMbt bug

## Input

`````js filename=intro
const obj = { prop: $("test") };
const result = `hello` + obj.prop;
$(result);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`test`);
const tmpStringConcatL /*:string*/ = $coerce(tmpObjLitVal, `plustr`);
const result /*:string*/ /*truthy*/ = `hello${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $(`test`) + ``;
$(`hello${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = $coerce( a, "plustr" );
const c = `hello${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`test`);
const obj = { prop: tmpObjLitVal };
const tmpBinBothLhs = `hello`;
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
 - 1: 'test'
 - 2: 'hellotest'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
