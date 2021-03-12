# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Param default > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
function f(p = ([a] = ($(10), $(20), [1, 2]))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs = [1, 2];
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat[0];
    p = tmpNestedAssignArrPatternRhs;
  } else {
    p = $tdz$__pattern;
  }
};
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat$1 = [...bindingPatternArrRoot];
let a = arrPatternSplat$1[0];
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs = [1, 2];
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat[0];
  }
};
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat$1 = [...bindingPatternArrRoot];
let a = arrPatternSplat$1[0];
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
