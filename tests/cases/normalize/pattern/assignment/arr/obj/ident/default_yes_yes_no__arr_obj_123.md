# Preval test case

# default_yes_yes_no__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: 1, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: 'fail2' };
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: 'fail2' };
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
