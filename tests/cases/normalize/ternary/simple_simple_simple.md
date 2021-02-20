# Preval test case

# simple_simple_simple.md

> Normalize > Ternary > Simple simple simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = 1 ? 2 : 3
const b = 0 ? 4 : 5
$(a, b)
`````

## Normalized

`````js filename=intro
let a = undefined;
a = 2;
let b = undefined;
b = 5;
$(a, b);
`````

## Output

`````js filename=intro
$(2, 5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
