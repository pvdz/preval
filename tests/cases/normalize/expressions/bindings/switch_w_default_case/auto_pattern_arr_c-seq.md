# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > bindings > switch_w_default_case > auto_pattern_arr_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = ($(10), $(20), $([1, 2]));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
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
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  $(10);
  $(20);
  tmpCallCallee = $;
  tmpCalleeParam = [1, 2];
  bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  arrPatternSplat = [...bindingPatternArrRoot];
  a = arrPatternSplat[0];
  $(a);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 1;
tmpSwitchCaseToStart = 0;
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  const bindingPatternArrRoot = $(tmpCalleeParam);
  const arrPatternSplat = [...bindingPatternArrRoot];
  const a = arrPatternSplat[0];
  $(a);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
