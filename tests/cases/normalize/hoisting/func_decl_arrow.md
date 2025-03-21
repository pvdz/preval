# Preval test case

# func_decl_arrow.md

> Normalize > Hoisting > Func decl arrow
>
> Function declaration in toplevel

## Input

`````js filename=intro
const g = () => {
  $(1);
  function f() {}
  $(f());
}
g();
`````

## Settled


`````js filename=intro
$(1);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
`````

## Pre Normal


`````js filename=intro
const g = () => {
  debugger;
  let f$3 = function () {
    debugger;
  };
  $(1);
  $(f$3());
};
g();
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  let f$3 = function () {
    debugger;
    return undefined;
  };
  $(1);
  const tmpCalleeParam = f$3();
  $(tmpCalleeParam);
  return undefined;
};
g();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
