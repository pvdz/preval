# Preval test case

# default_yes_no__obj_arr_123.md

> Normalize > Pattern > Binding > Obj > Arr > Default yes no  obj arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = { x: [1, 2, 3], a: 11, b: 12 };
$('ok');
`````

## Pre Normal

`````js filename=intro
const { x: [] = $([`fail`]) } = { x: [1, 2, 3], a: 11, b: 12 };
$(`ok`);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = [`fail`];
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
$(`ok`);
`````

## Output

`````js filename=intro
$(`ok`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
