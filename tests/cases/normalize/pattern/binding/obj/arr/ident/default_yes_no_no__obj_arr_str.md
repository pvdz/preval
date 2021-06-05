# Preval test case

# default_yes_no_no__obj_arr_str.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  obj arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] } = { x: ['abc'], a: 11, b: 12 };
$(y);
`````

## Pre Normal

`````js filename=intro
const {
  x: [y = 'fail'],
} = { x: ['abc'], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = ['abc'];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
$('abc');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
