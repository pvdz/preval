# Preval test case

# nested_template_expressions.md

> String fusing > Ai > Nested template expressions
>
> Test nested template expressions that should be resolved statically

## Input

`````js filename=intro
const inner = $("inner");
const outer = $("outer");
const nested = `nested${inner}`;
const result = `outer${nested}` + "end";
$(result);
`````


## Settled


`````js filename=intro
const inner /*:unknown*/ = $(`inner`);
$(`outer`);
const tmpBinBothRhs /*:string*/ = $coerce(inner, `string`);
const result /*:string*/ /*truthy*/ = `outernested${tmpBinBothRhs}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const inner = $(`inner`);
$(`outer`);
$(`outernested${inner}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "inner" );
$( "outer" );
const b = $coerce( a, "string" );
const c = `outernested${b}end`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const inner = $(`inner`);
const outer = $(`outer`);
const tmpBinBothLhs = `nested`;
const tmpBinBothRhs = $coerce(inner, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const nested = $coerce(tmpBinLhs, `plustr`);
const tmpBinBothLhs$1 = `outer`;
const tmpBinBothRhs$1 = $coerce(nested, `string`);
const tmpBinLhs$3 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinLhs$1 = $coerce(tmpBinLhs$3, `plustr`);
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const result = `${tmpStringConcatR}end`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner'
 - 2: 'outer'
 - 3: 'outernestedinnerend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
