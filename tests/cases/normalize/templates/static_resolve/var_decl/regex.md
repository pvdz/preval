# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Var decl > Regex
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${/foo/g}`;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = `` + $coerce(/foo/g, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = /foo/g;
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
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
