# Preval test case

# nan.md

> Normalize > Templates > Static resolve > Var decl > Nan
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${NaN}`;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = `` + $coerce(NaN, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(NaN, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output


`````js filename=intro
$(`NaN`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "NaN" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
