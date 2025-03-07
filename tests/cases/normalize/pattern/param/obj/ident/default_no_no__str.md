# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Obj > Ident > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x }) {
  return x;
}
$(f('abc', 10));
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = `abc`.x;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`.x);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x } = tmpParamBare;
  return x;
};
$(f(`abc`, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let x = bindingPatternObjRoot.x;
  return x;
};
const tmpCalleeParam = f(`abc`, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "abc".x;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
