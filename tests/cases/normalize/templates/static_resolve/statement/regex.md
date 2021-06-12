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
'' + /foo/g + '';
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = '';
const tmpBinBothRhs = /foo/g;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
tmpBinLhs + '';
`````

## Output

`````js filename=intro
const tmpBinBothRhs = /foo/g;
'' + tmpBinBothRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
