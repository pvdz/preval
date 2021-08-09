# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto pattern arr c-seq
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

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    [a] = ($(10), $(20), $([1, 2]));
    $(a);
  } else {
  }
}
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  $(a);
} else {
}
`````

## Output

`````js filename=intro
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const arrAssignPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...arrAssignPatternRhs];
const tmpClusterSSA_a = arrPatternSplat[0];
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
