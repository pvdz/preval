# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto pattern arr complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = $([1, 2]);
    $(a);
}
`````

## Normalized

`````js filename=intro
let tmpCallCallee;
let tmpCalleeParam;
let bindingPatternArrRoot;
let arrPatternSplat;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  tmpCallCallee = $;
  tmpCalleeParam = [1, 2];
  bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  arrPatternSplat = [...bindingPatternArrRoot];
  a = arrPatternSplat[0];
  $(a);
}
`````

## Output

`````js filename=intro
const tmpCalleeParam = [1, 2];
const bindingPatternArrRoot = $(tmpCalleeParam);
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
