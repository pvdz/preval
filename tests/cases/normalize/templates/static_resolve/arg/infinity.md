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
$('' + Infinity + '');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = 'Infinity';
const tmpCalleeParam = tmpBinLhs + '';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('Infinity');
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
