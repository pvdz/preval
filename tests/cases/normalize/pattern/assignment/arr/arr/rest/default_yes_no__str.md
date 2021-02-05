# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[...x] = $('pass')] = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 'abc';
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $('pass');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $('pass');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Result

Should call `$` with:
 - 1: ['a']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
