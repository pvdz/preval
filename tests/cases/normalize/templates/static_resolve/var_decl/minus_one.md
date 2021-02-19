# Preval test case

# minus_one.md

> normalize > templates > static_resolve > var_decl > minus_one
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${-1}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = `${-1}`;
$(x);
`````

## Output

`````js filename=intro
const x = `${-1}`;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '-1'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
