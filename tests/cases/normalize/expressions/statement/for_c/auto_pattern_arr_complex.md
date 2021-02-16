# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > statement > for_c > auto_pattern_arr_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); $([1, 2]));
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
      tmpCallCallee(tmpCalleeParam);
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
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCalleeParam = [1, 2];
    $(tmpCalleeParam);
  } else {
    break;
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
