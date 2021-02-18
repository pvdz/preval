# Preval test case

# mem_static_computed_prop_lhs.md

> normalize > member_access > mem_static_computed_prop_lhs
>
> assigning to member expression where the lhs is a computed member expression with a static property

#TODO

## Input

`````js filename=intro
const obj = {x: 1};
obj['x'] = 2;
$(obj);
`````

## Normalized

`````js filename=intro
const obj = { x: 1 };
obj.x = 2;
$(obj);
`````

## Output

`````js filename=intro
const obj = { x: 1 };
obj.x = 2;
$(obj);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
