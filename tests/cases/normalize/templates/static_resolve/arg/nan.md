# Preval test case

# nan.md

> Normalize > Templates > Static resolve > Arg > Nan
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${NaN}`);
`````

## Pre Normal

`````js filename=intro
$(`${NaN}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'NaN';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('NaN');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
