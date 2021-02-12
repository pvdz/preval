# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > assignments > for_c > auto_pattern_arr_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); [a] = $([1, 2]));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpCallCallee = $;
      const tmpCalleeParam = [1, 2];
      const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
      const arrPatternSplat$1 = [...arrAssignPatternRhs];
      a = arrPatternSplat$1[0];
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpCalleeParam = [1, 2];
      const arrAssignPatternRhs = $(tmpCalleeParam);
      const arrPatternSplat$1 = [...arrAssignPatternRhs];
      a = arrPatternSplat$1[0];
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
