# Preval test case

# default_yes_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['pass2']) } = { x: undefined, a: 11, b: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined, a: 11, b: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['pass2'];
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'bad'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
