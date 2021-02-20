# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Logic or both > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$((a = { b } = $({ b: $(2) })) || (a = { b } = $({ b: $(2) })));
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs;
  const tmpCallCallee$2 = $;
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$2 = { b: tmpObjLitVal$1 };
  const tmpNestedAssignObjPatternRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
  b = tmpNestedAssignObjPatternRhs$1.b;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
let SSA_b = tmpNestedAssignObjPatternRhs.b;
let SSA_a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$2 = { b: tmpObjLitVal$1 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$2);
  SSA_b = tmpNestedAssignObjPatternRhs$1.b;
  SSA_a = tmpNestedAssignObjPatternRhs$1;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs$1;
}
$(tmpCalleeParam);
$(SSA_a, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }
 - 4: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
