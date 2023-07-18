# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Arg > Infinity
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${Infinity}`);
`````

## Pre Normal

`````js filename=intro
$(`` + $coerce(Infinity, `string`) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(Infinity, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`Infinity`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "Infinity" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Infinity'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
