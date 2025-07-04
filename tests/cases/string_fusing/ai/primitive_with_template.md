# Preval test case

# primitive_with_template.md

> String fusing > Ai > Primitive with template
>
> Test primitive concatenation with template literal (reverse order)

## Input

`````js filename=intro
const template = $("hello");
const result = "test" + `world${template}`;
$(result);
`````


## Settled


`````js filename=intro
const template /*:unknown*/ = $(`hello`);
const tmpStringConcatL /*:string*/ = $coerce(template, `string`);
const result /*:string*/ /*truthy*/ = `testworld${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`testworld${$(`hello`)}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $coerce( a, "string" );
const c = `testworld${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const template = $(`hello`);
const tmpBinBothLhs = `test`;
const tmpBinBothLhs$1 = `world`;
const tmpBinBothRhs$1 = $coerce(template, `string`);
const tmpBinLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothRhs = $coerce(tmpBinLhs, `plustr`);
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'testworldhello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
