# Preval test case

# auto_pattern_obj_simple.md

> Normalize > Expressions > Assignments > Switch w default case block > Auto pattern obj simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a, b } = { a: 1, b: 2 };
$(a, b);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 1, b: 2 };
let a = bindingPatternObjRoot.a;
let b = bindingPatternObjRoot.b;
$(a, b);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 1, b: 2 };
const a = bindingPatternObjRoot.a;
const b = bindingPatternObjRoot.b;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
