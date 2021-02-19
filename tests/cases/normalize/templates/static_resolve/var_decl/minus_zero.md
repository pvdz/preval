# Preval test case

# minus_zero.md

> normalize > templates > static_resolve > var_decl > minus_zero
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${-0}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = `${-0}`;
$(x);
`````

## Output

`````js filename=intro
const x = `${-0}`;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
