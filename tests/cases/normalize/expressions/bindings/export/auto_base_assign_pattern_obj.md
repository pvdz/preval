# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Bindings > Export > Auto base assign pattern obj
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

export let a = ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = ({ b: b } = $({ b: $(2) }));
export { a };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = undefined;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpSSA_b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, tmpSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
