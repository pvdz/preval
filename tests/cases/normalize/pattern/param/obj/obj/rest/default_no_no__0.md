# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return 'bad';
}
$(f(0, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { ...y },
  } = tmpParamBare;
  return `bad`;
};
$(f(0, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$3 = undefined;
  let y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return `bad`;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = f(0, 10);
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const objPatternNoDefault = (0).x;
const tmpCalleeParam$1 = [];
objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0.x;
const b = [];
objPatternRest( a, b, undefined );
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
