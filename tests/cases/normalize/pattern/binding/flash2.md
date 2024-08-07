# Preval test case

# flash2.md

> Normalize > Pattern > Binding > Flash2
>
> Regression hunting

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

Note that the implicit global is caused by TDZ access of x. The pattern `{x}` is cleaned up because it's otherwise unused. But the TDZ access for `foo=x` is left behind.

- skipEval

## Input

`````js filename=intro
function x(foo = x, {x}) { 
  //return [foo, x]; 
}
x();
`````

## Pre Normal


`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let foo = tmpParamBare === undefined ? x$1 : tmpParamBare;
  let { x: x$1 } = tmpParamBare$1;
};
x();
`````

## Normalized


`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let foo = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    foo = x$1;
  } else {
    foo = tmpParamBare;
  }
  let bindingPatternObjRoot = tmpParamBare$1;
  let x$1 = bindingPatternObjRoot.x;
  return undefined;
};
x();
`````

## Output


`````js filename=intro
$inlinedFunction: {
  throw `Preval: This statement contained a read that reached no writes: x\$1;`;
}
`````

## PST Output

With rename=true

`````js filename=intro
$inlinedFunction: {
  throw "Preval: This statement contained a read that reached no writes: x$1;";
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
