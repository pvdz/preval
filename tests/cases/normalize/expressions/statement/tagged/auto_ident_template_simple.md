# Preval test case

# auto_ident_template_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident template simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = `fo${1}o`;
$(a);
`````

## Settled


`````js filename=intro
$(`fo1o`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`fo1o`);
`````

## Pre Normal


`````js filename=intro
let a = `fo` + $coerce(1, `string`) + `o`;
$(a);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = `fo`;
const tmpBinBothRhs = $coerce(1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let a = `${tmpStringConcatR}o`;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "fo1o" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'fo1o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
