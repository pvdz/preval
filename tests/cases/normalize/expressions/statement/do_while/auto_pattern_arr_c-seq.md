# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > Do while > Auto pattern arr c-seq
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

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = ($(10), $(20), $([1, 2]));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  $(10);
  $(20);
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  tmpDoWhileFlag = $(tmpCalleeParam);
}
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
