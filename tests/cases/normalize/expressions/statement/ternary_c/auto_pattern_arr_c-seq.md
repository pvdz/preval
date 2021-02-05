# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > statement > ternary_c > auto_pattern_arr_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(0) ? $(100) : ($(10), $(20), $([1, 2]));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  $(10);
  $(20);
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  $(10);
  $(20);
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
