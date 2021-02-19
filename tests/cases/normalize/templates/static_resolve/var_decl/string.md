# Preval test case

# string.md

> normalize > templates > static_resolve > var_decl > string
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${"why"}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = 'why';
$(x);
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
