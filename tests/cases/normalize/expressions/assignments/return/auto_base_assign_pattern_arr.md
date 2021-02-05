# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > assignments > return > auto_base_assign_pattern_arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
function f() {
  return (a = [b] = $([$(2)]));
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs;
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = [];
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs;
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: [2]
 - 4: [2], 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
