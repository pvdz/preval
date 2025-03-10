# Preval test case

# default_yes_no_no__0.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return 'bad';
}
$(f(0, 10));
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
const objPatternBeforeDefault /*:unknown*/ = objPatternNoDefault.y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $(`fail`);
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ((0).x.y === undefined) {
  $(`fail`);
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { y: y = $(`fail`) },
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
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = $(`fail`);
    return `bad`;
  } else {
    y = objPatternBeforeDefault;
    return `bad`;
  }
};
const tmpCalleeParam = f(0, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
const b = a.y;
const c = b === undefined;
if (c) {
  $( "fail" );
  $( "bad" );
}
else {
  $( "bad" );
}
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
