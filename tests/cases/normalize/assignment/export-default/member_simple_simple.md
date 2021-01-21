# Preval test case

# member_simple_simple.md

> normalize > assignment > export-default > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
export default a.x = b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 2;
let c = 3;
export default a.x = b;
$(a, b, c);
`````

## Output

`````js filename=intro
let a = { x: 10 };
export default a.x = 2;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same