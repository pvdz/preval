# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > param_default > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
function f(p = (a = { b } = $({ b: $(2) }))) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs;
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    a = tmpNestedAssignObjPatternRhs;
  }
}
let b = {};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: undefined
 - 4: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
