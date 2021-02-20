# Preval test case

# minus_one.md

> Normalize > Templates > Static resolve > Arg > Minus one
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${-1}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `${-1}`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = `${-1}`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '-1'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
