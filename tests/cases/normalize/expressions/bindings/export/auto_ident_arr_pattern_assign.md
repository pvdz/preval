# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > bindings > export > auto_ident_arr_pattern_assign
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

export let a = ([x, y] = [$(3), $(4)]);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
const a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, x, y);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
