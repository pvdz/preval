# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Assign > Template simple
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${`I am a string`}`;
$(x);
`````

## Settled


`````js filename=intro
$(`I am a string`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`I am a string`);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = `` + $coerce(`I am a string`, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`I am a string`, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "I am a string" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'I am a string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
