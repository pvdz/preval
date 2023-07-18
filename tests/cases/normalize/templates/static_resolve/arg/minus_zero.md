# Preval test case

# minus_zero.md

> Normalize > Templates > Static resolve > Arg > Minus zero
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${-0}`);
`````

## Pre Normal

`````js filename=intro
$(`` + $coerce(-0, `string`) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(-0, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`0`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "0" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
