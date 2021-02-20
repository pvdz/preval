# Preval test case

# default_yes_yes__0_1.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  0 1
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
  return 'bad';
}
f(true);
`````

## Output

`````js filename=intro
function f(tmp) {
  [...tmp];
  return 'bad';
}
f(true);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
