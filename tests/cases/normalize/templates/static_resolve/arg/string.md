# Preval test case

# string.md

> normalize > templates > static_resolve > arg > string
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${"why"}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'why';
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

Normalized calls: Same

Final output calls: Same
