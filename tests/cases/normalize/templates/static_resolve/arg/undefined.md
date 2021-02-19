# Preval test case

# undefined.md

> normalize > templates > static_resolve > arg > undefined
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${undefined}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'undefined';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('undefined');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
