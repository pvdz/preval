# Preval test case

# template_with_constant_template.md

> String fusing > Ai > Template with constant template
>
> Test template literal with constant template literal expression

## Input

`````js filename=intro
const dynamic = $("dynamic");
const constantTemplate = `constant`;
const result = `start${dynamic}` + constantTemplate;
$(result);
`````


## Settled


`````js filename=intro
const dynamic /*:unknown*/ = $(`dynamic`);
const tmpStringConcatL /*:string*/ = $coerce(dynamic, `string`);
const result /*:string*/ /*truthy*/ = `start${tmpStringConcatL}constant`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`start${$(`dynamic`)}constant`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "dynamic" );
const b = $coerce( a, "string" );
const c = `start${b}constant`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const dynamic = $(`dynamic`);
const constantTemplate = `constant`;
const tmpBinBothLhs = `start`;
const tmpBinBothRhs = $coerce(dynamic, `string`);
const tmpBinLhs$1 = tmpBinBothLhs + tmpBinBothRhs;
const tmpBinLhs = $coerce(tmpBinLhs$1, `plustr`);
const result = tmpBinLhs + constantTemplate;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'dynamic'
 - 2: 'startdynamicconstant'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
