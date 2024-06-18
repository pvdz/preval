# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Statement > Template simple
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${`I am a string`}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce(`I am a string`, `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`I am a string`, `string`);
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
