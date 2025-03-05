# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Arg > Template simple
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${`I am a string`}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(`I am a string`, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`I am a string`, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`I am a string`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "I am a string" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'I am a string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
