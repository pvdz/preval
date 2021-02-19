# Preval test case

# nan.md

> normalize > templates > static_resolve > var_decl > nan
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${NaN}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = 'NaN';
$(x);
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

Normalized calls: Same

Final output calls: Same
