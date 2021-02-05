# Preval test case

# default_yes_no__arr_0.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x = $('pass')] = [0, 201]);
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [0, 201];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
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
const arrAssignPatternRhs = [0, 201];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
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
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
