# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > assignments > for_in_left > auto_pattern_arr_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (([a] = ($(10), $(20), $([1, 2]))).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    $(10);
    $(20);
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = [1, 2];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat$1[0];
    tmpAssignMemLhsObj = tmpNestedAssignArrPatternRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    $(10);
    $(20);
    const tmpCalleeParam$1 = [1, 2];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat$1[0];
    const tmpAssignMemLhsObj = tmpNestedAssignArrPatternRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
