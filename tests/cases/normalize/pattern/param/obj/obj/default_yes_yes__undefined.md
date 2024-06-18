# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'pass2' } })) {
  return 'ok';
}
$(f(undefined, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: {} = $({ x: `fail` }) } = tmpParamBare === undefined ? $({ x: { y: `pass2` } }) : tmpParamBare;
  return `ok`;
};
$(f(undefined, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = { y: `pass2` };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { x: `fail` };
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternCrashTest = objPatternAfterDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternAfterDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(undefined, 10);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpObjLitVal = { y: `pass2` };
const tmpCalleeParam = { x: tmpObjLitVal };
const tmpClusterSSA_bindingPatternObjRoot = $(tmpCalleeParam);
const objPatternBeforeDefault = tmpClusterSSA_bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
let objPatternCrashTest = false;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = { x: `fail` };
  objPatternAfterDefault = $(tmpCalleeParam$1);
  objPatternCrashTest = objPatternAfterDefault === undefined;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternAfterDefault === null;
}
if (objPatternCrashTest) {
  objPatternAfterDefault.cannotDestructureThis;
} else {
}
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: "pass2" };
const b = { x: a };
const c = $( b );
const d = c.x;
let e = undefined;
const f = d === undefined;
let g = false;
if (f) {
  const h = { x: "fail" };
  e = $( h );
  g = e === undefined;
}
else {
  e = d;
}
if (g) {

}
else {
  g = e === null;
}
if (g) {
  e.cannotDestructureThis;
}
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"\\"pass2\\""}' }
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
