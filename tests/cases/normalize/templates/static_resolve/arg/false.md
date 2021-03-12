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
$(`${false}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'false';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('false');
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
