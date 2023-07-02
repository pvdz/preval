# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > While > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
while (($(10), $(20), [1, 2])) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
while (($(10), $(20), [1, 2])) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
while (true) {
  $(10);
  $(20);
  const tmpIfTest = [1, 2];
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
$(10);
$(20);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(10);
  $(20);
  $(100);
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
