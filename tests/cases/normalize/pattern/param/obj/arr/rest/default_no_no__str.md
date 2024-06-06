# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] }) {
  return 'bad';
}
$(f('abc', 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [...y],
  } = tmpParamBare;
  return `bad`;
};
$(f(`abc`, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat.slice(0);
  return `bad`;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(`abc`, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const objPatternNoDefault = `abc`.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat.slice(0);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "abc".x;
const b = [ ... a ];
b.slice( 0 );
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
