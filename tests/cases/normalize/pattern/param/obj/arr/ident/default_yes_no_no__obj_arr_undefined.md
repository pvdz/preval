# Preval test case

# default_yes_no_no__obj_arr_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes no no  obj arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'pass'] }) {
  return y;
}
$(f({ x: [undefined], a: 11, b: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [y = `pass`],
  } = tmpParamBare;
  return y;
};
$(f({ x: [undefined], a: 11, b: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = `pass`;
    return y;
  } else {
    y = arrPatternBeforeDefault;
    return y;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [undefined];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
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
  const arrPatternSplat = [...objPatternNoDefault];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    return `pass`;
  } else {
    return arrPatternBeforeDefault;
  }
};
const tmpObjLitVal = [undefined];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
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
  const e = [ ... d ];
  const f = e[ 0 ];
  const g = f === undefined;
  if (g) {
    return "pass";
  }
  else {
    return f;
  }
};
const h = [ undefined ];
const i = {
x: h,
a: 11,
b: 12
;
const j = a( i );
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
