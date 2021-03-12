# Preval test case

# default_yes_no_no__obj_obj_empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  obj obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = { x: { x: 1, y: '', z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { x: 1, y: '', z: 3 };
const $tdz$__pattern_after_default = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { x: 1, y: '', z: 3 };
const $tdz$__pattern_after_default = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
