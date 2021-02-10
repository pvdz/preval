# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > assignments > param_default > auto_pattern_arr_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
function f(arg = ([a] = ($(10), $(20), [1, 2]))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs = [1, 2];
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat[0];
    arg = tmpNestedAssignArrPatternRhs;
  } else {
    arg = $tdz$__arg;
  }
}
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
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
