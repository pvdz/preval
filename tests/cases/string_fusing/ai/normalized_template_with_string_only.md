# Preval test case

# normalized_template_with_string_only.md

> String fusing > Ai > Normalized template with string only
>
> Test string fusing reducer on normalized template + string literal

Expected Output:

The string fusing reducer should detect that `world${template}` + `test` should be fused into a single template: `world${template}test`, which should then be normalized to `worldtest${template}`

## Options

- reducersOnly: stringFusing

## Input

`````js filename=intro
const template = $(`hello`);
const result = `world${template}` + `test`;
$(result);
`````


## Settled


`````js filename=intro
const template /*:unknown*/ = $(`hello`);
const tmpBinBothLhs /*:string*/ /*truthy*/ = `world`;
const tmpBinBothRhs /*:string*/ = $coerce(template, `string`);
const tmpBinLhs$1 /*:string*/ /*truthy*/ = `world${tmpBinBothRhs}`;
const tmpBinLhs /*:string*/ = $coerce(tmpBinLhs$1, `plustr`);
const tmpStringConcatR /*:string*/ = $coerce(tmpBinLhs, `plustr`);
const result /*:string*/ /*truthy*/ = `${tmpStringConcatR}test`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const template = $(`hello`);
const tmpBinBothLhs = `world`;
const tmpStringConcatR = `world${template}` + `` + ``;
$(`${tmpStringConcatR}test`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = "world";
const c = $coerce( a, "string" );
const d = `world${c}`;
const e = $coerce( d, "plustr" );
const f = $coerce( e, "plustr" );
const g = `${f}test`;
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const template = $(`hello`);
const tmpBinBothLhs = `world`;
const tmpBinBothRhs = $coerce(template, `string`);
const tmpBinLhs$1 = tmpBinBothLhs + tmpBinBothRhs;
const tmpBinLhs = $coerce(tmpBinLhs$1, `plustr`);
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const result = `${tmpStringConcatR}test`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'worldhellotest'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
