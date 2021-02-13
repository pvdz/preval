# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > statement > for_let > auto_pattern_arr_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (let xyz = $([1, 2]); ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
{
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  let xyz = tmpCallCallee(tmpCalleeParam);
  while (true) {
    $(xyz);
    $(1);
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
  const tmpCalleeParam = [1, 2];
  let xyz = $(tmpCalleeParam);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same