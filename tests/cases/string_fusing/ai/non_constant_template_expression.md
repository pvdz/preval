# Preval test case

# non_constant_template_expression.md

> String fusing > Ai > Non constant template expression
>
> Test template expressions that are not constants and should not be resolved

## Input

`````js filename=intro
let dynamic = $("dynamic");
const template = `start${dynamic}end`;
const result = template + "suffix";
$(result);
`````


## Settled


`````js filename=intro
const dynamic /*:unknown*/ = $(`dynamic`);
const tmpBinBothRhs /*:string*/ = $coerce(dynamic, `string`);
const result /*:string*/ /*truthy*/ = `start${tmpBinBothRhs}endsuffix`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`start${$(`dynamic`)}endsuffix`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "dynamic" );
const b = $coerce( a, "string" );
const c = `start${b}endsuffix`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let dynamic = $(`dynamic`);
const tmpBinBothLhs = `start`;
const tmpBinBothRhs = $coerce(dynamic, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const template = `${tmpStringConcatR}end`;
const tmpStringConcatR$1 = $coerce(template, `plustr`);
const result = `${tmpStringConcatR$1}suffix`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'dynamic'
 - 2: 'startdynamicendsuffix'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
