# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Binary both > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$((a = { b } = $({ b: $(2) })) + (a = { b } = $({ b: $(2) })));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpBinBothLhs = a;
const tmpCallCallee$2 = $;
const tmpObjLitVal$1 = $(2);
const tmpCalleeParam$2 = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
b = tmpNestedAssignObjPatternRhs$1.b;
a = tmpNestedAssignObjPatternRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
tmpNestedAssignObjPatternRhs.b;
const tmpObjLitVal$1 = $(2);
const tmpCalleeParam$2 = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$2);
const SSA_b$1 = tmpNestedAssignObjPatternRhs$1.b;
const tmpCalleeParam = tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs$1, SSA_b$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 2
 - 4: { b: '2' }
 - 5: '[object Object][object Object]'
 - 6: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
