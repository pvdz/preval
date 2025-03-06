# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) }) {
  return y;
}
$(f('', 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [...y] = $([`pass`]) } = tmpParamBare;
  return y;
};
$(f(``, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`pass`];
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let y = arrPatternSplat.slice(0);
  return y;
};
const tmpCalleeParam$1 = f(``, 10);
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = ``.x;
let objPatternAfterDefault /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [`pass`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat /*:array*/ = [...objPatternAfterDefault];
const y /*:array*/ = arrPatternSplat.slice(0);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "".x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "pass" ];
  b = $( d );
}
else {
  b = a;
}
const e = [ ...b ];
const f = e.slice( 0 );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice