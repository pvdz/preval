# Preval test case

# default_yes_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] } = { x: 'abc', a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { x: 'abc', a: 11, b: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
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
const $tdz$__pattern_after_default = { x: 'abc', a: 11, b: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
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

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
