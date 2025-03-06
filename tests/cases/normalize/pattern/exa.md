# Preval test case

# exa.md

> Normalize > Pattern > Exa
>
> From https://gist.github.com/nicolo-ribaudo/f8ac7916f89450f2ead77d99855b2098 via https://twitter.com/NicoloRibaudo/status/1364918178095185920

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

## Pre Normal


`````js filename=intro
let arr_1 = undefined;
let arr_2 = undefined;
let arr_4 = undefined;
let val_1_2 = undefined;
let val_1_4 = undefined;
let val_2_1 = undefined;
let val_3_1 = undefined;
({
  val_1_1: { val_2_1: val_2_1, ...val_2_rest },
  val_1_2: val_1_2,
  val_1_3: [arr_1, arr_2, { val_3_1: val_3_1, ...val_3_rest }, arr_4],
  val_1_4: val_1_4,
} = foo());
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
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [`val_2_1`];
val_2_rest = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
val_1_2 = tmpAssignObjPatternRhs.val_1_2;
const objPatternNoDefault$1 = tmpAssignObjPatternRhs.val_1_3;
const arrPatternSplat = [...objPatternNoDefault$1];
arr_1 = arrPatternSplat[0];
arr_2 = arrPatternSplat[1];
const arrPatternStep = arrPatternSplat[2];
val_3_1 = arrPatternStep.val_3_1;
const tmpCalleeParam$3 = arrPatternStep;
const tmpCalleeParam$5 = [`val_3_1`];
val_3_rest = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
arr_4 = arrPatternSplat[3];
val_1_4 = tmpAssignObjPatternRhs.val_1_4;
`````

## Output


`````js filename=intro
const tmpAssignObjPatternRhs /*:unknown*/ = foo();
const objPatternNoDefault /*:unknown*/ = tmpAssignObjPatternRhs.val_1_1;
objPatternNoDefault.val_2_1;
const tmpCalleeParam$1 /*:array*/ = [`val_2_1`];
val_2_rest = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
tmpAssignObjPatternRhs.val_1_2;
const objPatternNoDefault$1 /*:unknown*/ = tmpAssignObjPatternRhs.val_1_3;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault$1];
arrPatternSplat[0];
arrPatternSplat[1];
const arrPatternStep /*:unknown*/ = arrPatternSplat[2];
arrPatternStep.val_3_1;
const tmpCalleeParam$5 /*:array*/ = [`val_3_1`];
val_3_rest = objPatternRest(arrPatternStep, tmpCalleeParam$5, undefined);
arrPatternSplat[3];
tmpAssignObjPatternRhs.val_1_4;
`````

## PST Output

With rename=true

`````js filename=intro
const a = foo();
const b = a.val_1_1;
b.val_2_1;
const c = [ "val_2_1" ];
val_2_rest = objPatternRest( b, c, undefined );
a.val_1_2;
const d = a.val_1_3;
const e = [ ...d ];
e[ 0 ];
e[ 1 ];
const f = e[ 2 ];
f.val_3_1;
const g = [ "val_3_1" ];
val_3_rest = objPatternRest( f, g, undefined );
e[ 3 ];
a.val_1_4;
`````

## Globals

BAD@! Found 3 implicit global bindings:

foo, val_2_rest, val_3_rest

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope