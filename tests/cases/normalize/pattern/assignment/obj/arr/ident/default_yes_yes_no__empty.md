# Preval test case

# default_yes_yes_no__empty.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['fail2']) } = 1);
$('bad');
`````

## Pre Normal

`````js filename=intro
({ x: [y = `fail`] = $([`fail2`]) } = 1);
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = [`fail2`];
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = `fail`;
} else {
  y = arrPatternBeforeDefault;
}
$(`bad`);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (1).x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`fail2`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = `fail`;
} else {
  y = arrPatternBeforeDefault;
}
$(`bad`);
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - 1: ['fail2']
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
