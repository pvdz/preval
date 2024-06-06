# Preval test case

# default_yes_no_no__obj_missing.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] }) {
  return 'bad';
}
$(f({ a: 11, b: 12 }, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [y = `fail`],
  } = tmpParamBare;
  return `bad`;
};
$(f({ a: 11, b: 12 }, 10));
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
    y = `fail`;
    return `bad`;
  } else {
    y = arrPatternBeforeDefault;
    return `bad`;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { a: 11, b: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const objPatternNoDefault = $ObjectPrototype.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.x;
const b = [ ... a ];
b[ 0 ];
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
