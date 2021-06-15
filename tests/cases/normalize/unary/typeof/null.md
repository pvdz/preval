# Preval test case

# null.md

> Normalize > Unary > Typeof > Null
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof null);
`````

## Pre Normal

`````js filename=intro
$(typeof null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `object`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`object`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
