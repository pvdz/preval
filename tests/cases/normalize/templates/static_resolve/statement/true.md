# Preval test case

# true.md

> Normalize > Templates > Static resolve > Statement > True
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${true}`;
`````

## Pre Normal

`````js filename=intro
`` + $coerce(true, `string`) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(true, `string`);
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
