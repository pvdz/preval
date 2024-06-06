# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Ident > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f(undefined, 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = tmpParamBare === undefined ? `pass` : tmpParamBare;
  return x;
};
$(f(undefined, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    x = `pass`;
    return x;
  } else {
    x = tmpParamBare;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
