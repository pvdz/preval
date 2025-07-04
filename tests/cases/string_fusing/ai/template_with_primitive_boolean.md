# Preval test case

# template_with_primitive_boolean.md

> String fusing > Ai > Template with primitive boolean
>
> Test template literal concatenation with primitive boolean

## Input

`````js filename=intro
const template = $("hello");
const result = `world${template}` + true;
$(result);
`````


## Settled


`````js filename=intro
const template /*:unknown*/ = $(`hello`);
const tmpBinBothRhs /*:string*/ = $coerce(template, `string`);
const result /*:string*/ /*truthy*/ = `world${tmpBinBothRhs}true`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`world${$(`hello`)}true`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $coerce( a, "string" );
const c = `world${b}true`;
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
const result = tmpBinLhs + true;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'worldhellotrue'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
