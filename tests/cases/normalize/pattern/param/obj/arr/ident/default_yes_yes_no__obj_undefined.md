# Preval test case

# default_yes_yes_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) }) {
  return 'bad';
}
$(f({ x: undefined, a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [y = `fail`] = $([`pass2`]) } = tmpParamBare;
  return `bad`;
};
$(f({ x: undefined, a: 11, b: 12 }, 10));
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
    const tmpCallCallee = $;
    const tmpCalleeParam = [`pass2`];
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    y = `fail`;
    return `bad`;
  } else {
    y = arrPatternBeforeDefault;
    return `bad`;
  }
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = { x: undefined, a: 11, b: 12 };
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`pass2`];
const objPatternAfterDefault = $(tmpCalleeParam);
const arrPatternSplat = [...objPatternAfterDefault];
arrPatternSplat[0];
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
const c = [ ... b ];
c[ 0 ];
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
