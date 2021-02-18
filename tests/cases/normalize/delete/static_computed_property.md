# Preval test case

# static_computed_property.md

> normalize > delete > static_computed_property
>
> The property be normalized

#TODO

## Input

`````js filename=intro
const obj = {x: 1};
delete obj['x'];
`````

## Normalized

`````js filename=intro
const obj = { x: 1 };
delete obj.x;
`````

## Output

`````js filename=intro
const obj = { x: 1 };
delete obj.x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
