# Preval test case

# minus_zero.md

> Normalize > Templates > Static resolve > Assign > Minus zero
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${-0}`;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = `` + $coerce(-0, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(-0, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output


`````js filename=intro
$(`0`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "0" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
