# Preval test case

# shorthand_mangle.md

> Normalize > Pattern > Binding > Shorthand mangle
>
> Unique names and shorthand properties

There's was a problem where the shorthand name was being changed without respecting the property name.

So it was cuasing the property to read `param.x$1` rather than `param.x`. Oopsie

## Input

`````js filename=intro
const x = 1;
function f({x}) { 
  return x; 
}
$(x, f({x: 2}));
`````

## Settled


`````js filename=intro
$(1, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 2);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x$1 } = tmpParamBare;
  return x$1;
};
const x = 1;
$(x, f({ x: 2 }));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let x$1 = bindingPatternObjRoot.x;
  return x$1;
};
const x = 1;
const tmpCalleeParam = x;
const tmpCallCallee = f;
const tmpCalleeParam$3 = { x: 2 };
const tmpCalleeParam$1 = tmpCallCallee(tmpCalleeParam$3);
$(tmpCalleeParam, tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
