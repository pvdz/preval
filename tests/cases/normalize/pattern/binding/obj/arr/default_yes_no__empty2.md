# Preval test case

# default_yes_no__empty2.md

> Normalize > Pattern > Binding > Obj > Arr > Default yes no  empty2
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = ['fail'] } = 1;
$('ok');
`````

## Pre Normal

`````js filename=intro
const { x: [] = [`fail`] } = 1;
$(`ok`);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  objPatternAfterDefault = [`fail`];
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
$(`ok`);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (1).x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  objPatternAfterDefault = [`fail`];
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
[...objPatternAfterDefault];
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
