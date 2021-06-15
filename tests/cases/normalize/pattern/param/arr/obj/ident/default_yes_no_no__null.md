# Preval test case

# default_yes_no_no__null.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return 'bad';
}
$(f(null));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = $(`pass`) }] = tmpParamBare;
  return `bad`;
};
$(f(null));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $(`pass`);
    return `bad`;
  } else {
    x = objPatternBeforeDefault;
    return `bad`;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(null);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
[...null];
throw `[Preval]: Array spread must crash before this line`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
