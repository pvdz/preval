# Preval test case

# default_yes_no__0.md

> normalize > pattern >  > param > obj > arr > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = 0;
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 0;
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
$('ok');
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (0).x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['fail'];
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
[...objPatternAfterDefault];
$('ok');
`````

## Result

Should call `$` with:
 - 1: ['fail']
 - 2: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
