# Preval test case

# false.md

> Normalize > Templates > Static resolve > Arg > False
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${false}`);
`````

## Pre Normal

`````js filename=intro
$(`` + $coerce(false, `string`) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(false, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`false`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "false" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
