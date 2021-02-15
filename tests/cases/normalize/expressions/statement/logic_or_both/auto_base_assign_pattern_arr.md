# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > statement > logic_or_both > auto_base_assign_pattern_arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
([b] = $([$(2)])) || ([b] = $([$(2)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpIfTest = tmpNestedAssignArrPatternRhs;
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $;
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$1 = [tmpArrElement$1];
  const arrAssignPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  b = arrPatternSplat$1[0];
}
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
const tmpIfTest = tmpNestedAssignArrPatternRhs;
if (tmpIfTest) {
} else {
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$1 = [tmpArrElement$1];
  const arrAssignPatternRhs = $(tmpCalleeParam$1);
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  b = arrPatternSplat$1[0];
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
