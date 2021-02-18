# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > tagged > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$`before ${(a = { b } = $({ b: $(2) }))} after`;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$2 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$2);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
const tmpObjLitVal = $(2);
const tmpCalleeParam$2 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$2);
const SSA_b = tmpNestedAssignObjPatternRhs.b;
$(tmpCalleeParam, tmpNestedAssignObjPatternRhs);
$(tmpNestedAssignObjPatternRhs, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: ['before ', ' after'], { b: '2' }
 - 4: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
