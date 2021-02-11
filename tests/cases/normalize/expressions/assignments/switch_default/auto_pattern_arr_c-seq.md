# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > assignments > switch_default > auto_pattern_arr_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    [a] = ($(10), $(20), $([1, 2]));
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  {
    $(10);
    $(20);
    const tmpCallCallee = $;
    const tmpCalleeParam = [1, 2];
    const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat$1 = [...arrAssignPatternRhs];
    a = arrPatternSplat$1[0];
  }
}
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
