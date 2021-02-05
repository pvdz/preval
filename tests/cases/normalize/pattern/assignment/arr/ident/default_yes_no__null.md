# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > arr > ident > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x = $('fail')] = null);
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = null;
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
const arrPatternSplat = [...null];
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
