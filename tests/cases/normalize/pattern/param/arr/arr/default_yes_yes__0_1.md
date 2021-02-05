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
  const arrAssignPatternRhs = tmp;
  const arrPatternSplat = [...arrAssignPatternRhs];
  arrAssignPatternRhs;
  return 'bad';
}
f(true);
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
