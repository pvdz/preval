# Preval test case

# default_yes_no__0.md

> normalize > pattern >  > param > arr > ident > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x = $('fail')] = 0);
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 0;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault;
}
arrAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
