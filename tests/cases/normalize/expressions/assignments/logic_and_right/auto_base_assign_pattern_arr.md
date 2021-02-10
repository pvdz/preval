# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > assignments > logic_and_right > auto_base_assign_pattern_arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$($(100) && (a = [b] = $([$(2)])));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs;
  const tmpCallCallee$1 = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam$1 = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: [2]
 - 5: [2], 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
