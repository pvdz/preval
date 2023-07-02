# Preval test case

# string_lastindexof_two.md

> Type tracked > String method > String lastindexof two
>
> String lastIndexOf should fully resolve

## Input

`````js filename=intro
$('hello'.lastIndexOf('e', 4));
`````

## Pre Normal

`````js filename=intro
$(`hello`.lastIndexOf(`e`, 4));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello`.lastIndexOf(`e`, 4);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
