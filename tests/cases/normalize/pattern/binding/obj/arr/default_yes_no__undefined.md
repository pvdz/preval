# Preval test case

# default_yes_no__undefined.md

> Normalize > Pattern > Binding > Obj > Arr > Default yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = undefined;
$('bad');
`````

## Pre Normal

`````js filename=intro
const { x: [] = $([`fail`]) } = undefined;
$(`bad`);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined;
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
$(`bad`);
`````

## Output

`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
