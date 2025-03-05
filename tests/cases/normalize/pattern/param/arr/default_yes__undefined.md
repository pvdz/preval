# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Arr > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([] = $('pass')) {
  return 'ok';
}
$(f(undefined, 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [] = tmpParamBare === undefined ? $(`pass`) : tmpParamBare;
  return `ok`;
};
$(f(undefined, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $(`pass`);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  return `ok`;
};
const tmpCalleeParam = f(undefined, 200);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:unknown*/ = $(`pass`);
[...bindingPatternArrRoot];
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass" );
[ ...a ];
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
