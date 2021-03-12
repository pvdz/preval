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
$(`${-0}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `${-0}`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = `${-0}`;
$(tmpCalleeParam);
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
