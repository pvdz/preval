# Preval test case

# default_yes_no_no__arr_empty_str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_no_no__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('pass')]] = ['', 4, 5]);
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = ['', 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault;
}
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = ['', 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
