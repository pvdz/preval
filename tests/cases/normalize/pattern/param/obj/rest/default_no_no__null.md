# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return 'bad';
}
$(f(null, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare === undefined ? $({ a: `fail` }) : tmpParamBare;
  return `bad`;
};
$(f(null, 10));
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
    const tmpCalleeParam = { a: `fail` };
    bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  const tmpCallCallee$1 = objPatternRest;
  const tmpCalleeParam$1 = bindingPatternObjRoot;
  const tmpCalleeParam$3 = [];
  const tmpCalleeParam$5 = `x`;
  let x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  return `bad`;
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$7 = f(null, 10);
tmpCallCallee$3(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ = [];
objPatternRest(null, tmpCalleeParam$3, `x`);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
objPatternRest( null, a, "x" );
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
