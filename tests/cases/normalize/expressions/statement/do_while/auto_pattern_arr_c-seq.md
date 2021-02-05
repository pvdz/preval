# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > statement > do_while > auto_pattern_arr_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
do {
  $(100);
} while (($(10), $(20), $([1, 2])));
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
  tmpDoWhileTest = tmpCallCallee(tmpCalleeParam);
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
  tmpDoWhileTest = tmpCallCallee(tmpCalleeParam);
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
