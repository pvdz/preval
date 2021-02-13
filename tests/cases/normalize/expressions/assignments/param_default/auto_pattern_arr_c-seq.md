# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > assignments > param_default > auto_pattern_arr_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
function f(p = ([a] = ($(10), $(20), $([1, 2])))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    $(10);
    $(20);
    const tmpCallCallee = $;
    const tmpCalleeParam = [1, 2];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat[0];
    p = tmpNestedAssignArrPatternRhs;
  } else {
    p = $tdz$__p;
  }
}
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat$1 = [...bindingPatternArrRoot];
let a = arrPatternSplat$1[0];
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    $(10);
    $(20);
    const tmpCalleeParam = [1, 2];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat[0];
    p = tmpNestedAssignArrPatternRhs;
  } else {
    p = $tdz$__p;
  }
}
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat$1 = [...bindingPatternArrRoot];
let a = arrPatternSplat$1[0];
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
