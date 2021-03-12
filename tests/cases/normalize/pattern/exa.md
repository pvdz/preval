# Preval test case

# exa.md

> Normalize > Pattern > Exa
>
> From https://gist.github.com/nicolo-ribaudo/f8ac7916f89450f2ead77d99855b2098 via https://twitter.com/NicoloRibaudo/status/1364918178095185920

#TODO

## Input

`````js filename=intro
var {
  val_1_1: { val_2_1, ...val_2_rest },
  val_1_2,
  val_1_3: [
    arr_1,
    arr_2,
    { val_3_1, ...val_3_rest },
    arr_4
  ],
  val_1_4
} = foo();
`````

## Normalized

`````js filename=intro
let arr_1 = undefined;
let arr_2 = undefined;
let arr_4 = undefined;
let val_1_2 = undefined;
let val_1_4 = undefined;
let val_2_1 = undefined;
let val_3_1 = undefined;
const tmpAssignObjPatternRhs = foo();
const objPatternNoDefault = tmpAssignObjPatternRhs.val_1_1;
val_2_1 = objPatternNoDefault.val_2_1;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = ['val_2_1'];
const tmpCalleeParam$2 = undefined;
val_2_rest = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
val_1_2 = tmpAssignObjPatternRhs.val_1_2;
const objPatternNoDefault$1 = tmpAssignObjPatternRhs.val_1_3;
const arrPatternSplat = [...objPatternNoDefault$1];
arr_1 = arrPatternSplat[0];
arr_2 = arrPatternSplat[1];
const arrPatternStep = arrPatternSplat[2];
val_3_1 = arrPatternStep.val_3_1;
const tmpCallCallee$1 = objPatternRest;
const tmpCalleeParam$3 = arrPatternStep;
const tmpCalleeParam$4 = ['val_3_1'];
const tmpCalleeParam$5 = undefined;
val_3_rest = tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$4, tmpCalleeParam$5);
arr_4 = arrPatternSplat[3];
val_1_4 = tmpAssignObjPatternRhs.val_1_4;
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = foo();
const objPatternNoDefault = tmpAssignObjPatternRhs.val_1_1;
objPatternNoDefault.val_2_1;
const tmpCalleeParam$1 = ['val_2_1'];
val_2_rest = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
tmpAssignObjPatternRhs.val_1_2;
const objPatternNoDefault$1 = tmpAssignObjPatternRhs.val_1_3;
const arrPatternSplat = [...objPatternNoDefault$1];
arrPatternSplat[0];
arrPatternSplat[1];
const arrPatternStep = arrPatternSplat[2];
arrPatternStep.val_3_1;
const tmpCalleeParam$4 = ['val_3_1'];
val_3_rest = objPatternRest(arrPatternStep, tmpCalleeParam$4, undefined);
arrPatternSplat[3];
tmpAssignObjPatternRhs.val_1_4;
`````

## Globals

BAD@! Found 3 implicit global bindings:

foo, val_2_rest, val_3_rest

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same