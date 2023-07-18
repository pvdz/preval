# Preval test case

# minus_one.md

> Normalize > Templates > Static resolve > Statement > Minus one
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${-1}`;
`````

## Pre Normal

`````js filename=intro
`` + $coerce(-1, `string`) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(-1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
