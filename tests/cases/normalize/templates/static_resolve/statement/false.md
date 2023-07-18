# Preval test case

# false.md

> Normalize > Templates > Static resolve > Statement > False
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${false}`;
`````

## Pre Normal

`````js filename=intro
`` + $coerce(false, `string`) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(false, `string`);
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
