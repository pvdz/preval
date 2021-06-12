# Preval test case

# string.md

> Normalize > Templates > Static resolve > Arg > String
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${"why"}`);
`````

## Pre Normal

`````js filename=intro
$('' + 'why' + '');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = 'why';
const tmpCalleeParam = tmpBinLhs + '';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('why');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'why'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
