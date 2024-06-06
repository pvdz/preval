# Preval test case

# default_yes_no_no__obj_obj_missing.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes no no  obj obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('pass') } }) {
  return y;
}
$(f({ x: { x: 1, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { y: y = $(`pass`) },
  } = tmpParamBare;
  return y;
};
$(f({ x: { x: 1, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = $(`pass`);
    return y;
  } else {
    y = objPatternBeforeDefault;
    return y;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = { x: 1, z: 3 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternNoDefault = tmpParamBare.x;
  const objPatternBeforeDefault = objPatternNoDefault.y;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpClusterSSA_y = $(`pass`);
    return tmpClusterSSA_y;
  } else {
    return objPatternBeforeDefault;
  }
};
const tmpObjLitVal = { x: 1, z: 3 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = b.x;
  const e = d.y;
  const f = e === undefined;
  if (f) {
    const g = $( "pass" );
    return g;
  }
  else {
    return e;
  }
};
const h = {
x: 1,
z: 3
;
const i = {
x: h,
b: 11,
c: 12
;
const j = a( i );
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
