# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > arr_spread > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
[...({ b } = $({ b: $(2) }))];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpArrElToSpread;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpArrElToSpread = tmpNestedAssignObjPatternRhs;
[...tmpArrElToSpread];
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpArrElToSpread;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpArrElToSpread = tmpNestedAssignObjPatternRhs;
[...tmpArrElToSpread];
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
