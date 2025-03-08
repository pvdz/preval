# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident unary void simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = void arg;
    $(a, arg);
  }
}
$(f());
`````

## Settled


`````js filename=intro
$(undefined, 1);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, 1);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let arg = 1;
    let a = void arg;
    $(a, arg);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = undefined;
  $(undefined, arg);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined, 1 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
