# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Param > Obj > Arr > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [] }) {
  return 'bad';
}
$(f(0, 10));
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
[...objPatternNoDefault];
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = (0).x;
[...objPatternNoDefault];
$(`bad`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [],
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
  let arrPatternSplat = [...objPatternNoDefault];
  return `bad`;
};
const tmpCalleeParam = f(0, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
[ ...a ];
$( "bad" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Post settled calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Denormalized calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
