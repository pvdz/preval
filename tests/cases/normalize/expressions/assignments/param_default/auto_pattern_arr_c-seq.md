# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Param default > Auto pattern arr c-seq
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

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? ([a] = ($(10), $(20), $([1, 2]))) : tmpParamDefault;
};
let [a] = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
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
    p = tmpParamDefault;
  }
};
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
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    $(10);
    $(20);
    const tmpCalleeParam = [1, 2];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat[0];
  }
};
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat$1 = [...bindingPatternArrRoot];
let a = arrPatternSplat$1[0];
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
