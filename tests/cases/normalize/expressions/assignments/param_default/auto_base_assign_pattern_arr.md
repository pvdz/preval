# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > assignments > param_default > auto_base_assign_pattern_arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
function f(p = (a = [b] = $([$(2)]))) {}
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
    const tmpArrElement = $(2);
    const tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpArrElement = $(2);
    const tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    const tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = [];
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
 - 2: [2]
 - 3: undefined
 - 4: [2], 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
