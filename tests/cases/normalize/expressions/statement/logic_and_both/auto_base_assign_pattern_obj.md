# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > logic_and_both > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
({ b } = $({ b: $(2) })) && ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
  const tmpAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  b = tmpAssignObjPatternRhs.b;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
  const tmpAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  b = tmpAssignObjPatternRhs.b;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 2
 - 4: { b: '2' }
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
