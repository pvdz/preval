# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Arg > Regex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${/foo/g}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(/foo/g, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpCallCallee$1 = /foo/g;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`/foo/g`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "/foo/g" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/foo/g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
