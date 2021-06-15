# Preval test case

# default_yes_no_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] } = { x: undefined, a: 11, b: 12 };
$('bad');
`````

## Pre Normal

`````js filename=intro
const {
  x: [y = `fail`],
} = { x: undefined, a: 11, b: 12 };
$(`bad`);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: undefined, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = `fail`;
} else {
  y = arrPatternBeforeDefault;
}
$(`bad`);
`````

## Output

`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
