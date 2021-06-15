# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
let obj = {};
(a = { b } = $({ b: $(2) }))["a"];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: b } = $({ b: $(2) }))[`a`];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
tmpNestedAssignObjPatternRhs.a;
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
