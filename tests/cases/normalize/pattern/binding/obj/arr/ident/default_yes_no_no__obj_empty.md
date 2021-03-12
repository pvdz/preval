# Preval test case

# default_yes_no_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] } = {};
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = {};
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
$('bad');
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = {};
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
