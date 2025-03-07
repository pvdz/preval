# Preval test case

# func_decl_func_expr.md

> Normalize > Hoisting > Func decl func expr
>
> Function declaration in toplevel

## Input

`````js filename=intro
const g = function() {
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
const g = function () {
  debugger;
  let f = function () {
    debugger;
  };
  $(1);
  $(f());
};
g();
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  let f = function () {
    debugger;
    return undefined;
  };
  $(1);
  const tmpCalleeParam = f();
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
