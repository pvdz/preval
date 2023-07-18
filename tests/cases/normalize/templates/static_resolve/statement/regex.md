# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Statement > Regex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${/foo/g}`;
`````

## Pre Normal

`````js filename=intro
`` + $coerce(/foo/g, `string`) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = /foo/g;
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
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
