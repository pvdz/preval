# Preval test case

# default_yes_no__undefined.md

> Normalize > Pattern > Param > Obj > Ident > Default yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x = $('fail') }) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Settled


`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x = $(`fail`) } = tmpParamBare;
  return `bad`;
};
$(f(undefined, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $(`fail`);
    return `bad`;
  } else {
    x = objPatternBeforeDefault;
    return `bad`;
  }
};
const tmpCalleeParam = f(undefined, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
undefined.x;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
