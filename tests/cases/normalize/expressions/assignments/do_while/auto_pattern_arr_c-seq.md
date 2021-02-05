# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > assignments > do_while > auto_pattern_arr_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
do {
  $(100);
} while (([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
do {
  $(100);
  $(10);
  $(20);
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpDoWhileTest = tmpNestedAssignArrPatternRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
do {
  $(100);
  $(10);
  $(20);
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpDoWhileTest = tmpNestedAssignArrPatternRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
