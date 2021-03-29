# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let obj = {};
({ a } = $({ a: 1, b: 2 })).a;
$(a);
`````

## Pre Normal

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let obj = {};
({ a } = $({ a: 1, b: 2 })).a;
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let obj = {};
let tmpCompObj;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpCompObj = tmpNestedAssignObjPatternRhs;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 999, b: 1000 };
bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpSSA_a = tmpNestedAssignObjPatternRhs.a;
tmpNestedAssignObjPatternRhs.a;
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
