# Preval test case

# template_eq_empty.md

> Typed comparison > Template eq empty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = `${$}`;
const y = x === '';
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = `` + $coerce($, `string`) + ``;
const y = x === ``;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce($, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const x = $coerce(tmpBinLhs, `plustr`);
const y = x === ``;
$(`out:`, y);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:string*/ = $coerce($, `string`);
const y /*:boolean*/ = !tmpBinBothRhs;
$(`out:`, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $coerce( $, "string" );
const b = !a;
$( "out:", b );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
const tmpBinBothRhs = $coerce($, `string`);
$(`out:`, !tmpBinBothRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
