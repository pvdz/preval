# Preval test case

# default_yes_yes__0.md

> normalize > pattern >  > param > arr > arr > default_yes_yes__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(tmp) {
  [] = tmp
  return 'bad';
}
f(true);
`````

## Normalized

`````js filename=intro
function f(tmp) {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  arrAssignPatternRhs = tmp;
  arrPatternSplat = [...arrAssignPatternRhs];
  arrAssignPatternRhs;
  return 'bad';
}
f(true);
`````

## Output

`````js filename=intro
function f(tmp) {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  arrAssignPatternRhs = tmp;
  arrPatternSplat = [...arrAssignPatternRhs];
  return 'bad';
}
f(true);
`````

## Result

Should call `$` with:
 - 0: <crash[ undefined is not a function ]>

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];
