# Preval test case

# ident.md

> Normalize > Member access > Statement > Func > Ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  $.length;
}
$(f());
`````

## Settled


`````js filename=intro
$.length;
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$.length;
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $.length;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $.length;
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$.length;
$( undefined );
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
