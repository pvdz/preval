# Preval test case

# template_with_primitive_number.md

> String fusing > Ai > Template with primitive number
>
> Test template literal concatenation with primitive number

## Input

`````js filename=intro
const template = $("hello");
const result = `world${template}` + 42;
$(result);
`````


## Settled


`````js filename=intro
const template /*:unknown*/ = $(`hello`);
const tmpBinBothRhs /*:string*/ = $coerce(template, `string`);
const result /*:string*/ /*truthy*/ = `world${tmpBinBothRhs}42`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`world${$(`hello`)}42`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $coerce( a, "string" );
const c = `world${b}42`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const template = $(`hello`);
const tmpBinBothLhs = `world`;
const tmpBinBothRhs = $coerce(template, `string`);
const tmpBinLhs$1 = tmpBinBothLhs + tmpBinBothRhs;
const tmpBinLhs = $coerce(tmpBinLhs$1, `plustr`);
const result = tmpBinLhs + 42;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'worldhello42'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
