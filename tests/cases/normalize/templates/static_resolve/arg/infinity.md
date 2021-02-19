# Preval test case

# infinity.md

> normalize > templates > static_resolve > arg > infinity
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${Infinity}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'Infinity';
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

Normalized calls: Same

Final output calls: Same
