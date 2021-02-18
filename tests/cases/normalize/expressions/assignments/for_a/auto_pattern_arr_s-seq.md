# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > assignments > for_a > auto_pattern_arr_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for ([a] = ($(10), $(20), [1, 2]); ; $(1));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(10);
$(20);
const arrAssignPatternRhs = [1, 2];
const arrPatternSplat$1 = [...arrAssignPatternRhs];
a = arrPatternSplat$1[0];
while (true) {
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
$(10);
$(20);
const arrAssignPatternRhs = [1, 2];
const arrPatternSplat$1 = [...arrAssignPatternRhs];
const SSA_a = arrPatternSplat$1[0];
while (true) {
  $(1);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
