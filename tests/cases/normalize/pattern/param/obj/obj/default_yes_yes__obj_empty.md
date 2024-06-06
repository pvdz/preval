# Preval test case

# default_yes_yes__obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) } = $({ x: { y: 'fail2' } })) {
  return 'ok';
}
$(f({}, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: {} = $({ x: `pass` }) } = tmpParamBare === undefined ? $({ x: { y: `fail2` } }) : tmpParamBare;
  return `ok`;
};
$(f({}, 10));
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
    const tmpObjLitVal = { y: `fail2` };
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
    const tmpCalleeParam$1 = { x: `pass` };
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
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = {};
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const objPatternBeforeDefault = $ObjectPrototype.x;
let objPatternAfterDefault = undefined;
let objPatternCrashTest = false;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = { x: `pass` };
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
const a = $ObjectPrototype.x;
let b = undefined;
let c = false;
const d = a === undefined;
if (d) {
  const e = { x: "pass" };
  b = $( e );
  c = b === undefined;
}
else {
  b = a;
}
if (c) {

}
else {
  c = b === null;
}
if (c) {
  b.cannotDestructureThis;
}
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '"pass"' }
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
