# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > bindings > switch_case > auto_pattern_arr_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = ($(10), $(20), $([1, 2]));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
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
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      $(10);
      $(20);
      tmpCallCallee = $;
      tmpCalleeParam = [1, 2];
      bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
      arrPatternSplat = [...bindingPatternArrRoot];
      a = arrPatternSplat[0];
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      $(10);
      $(20);
      tmpCallCallee = $;
      tmpCalleeParam = [1, 2];
      bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
      arrPatternSplat = [...bindingPatternArrRoot];
      a = arrPatternSplat[0];
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same