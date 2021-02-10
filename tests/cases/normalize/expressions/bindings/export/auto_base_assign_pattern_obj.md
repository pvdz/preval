# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > bindings > export > auto_base_assign_pattern_obj
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

export let a = ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
