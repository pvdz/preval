# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > export_default > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
export default { b } = $({ b: $(2) });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpExportDefault = tmpNestedAssignObjPatternRhs;
export { tmpExportDefault as default };
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
