# Preval test case

# default_yes_no__elided.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default yes no  elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] = $(['fail']) } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````

## Pre Normal

`````js filename=intro
const { x: [...y] = $(['fail']) } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [, , , 1];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['fail'];
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Output

`````js filename=intro
const arrPatternSplat = [undefined, undefined, undefined, 1];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
