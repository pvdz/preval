# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = { a: 999, b: 1000 };
    a = !arg;
    $(a, arg);
  }
}
$(f());
`````

## Settled


`````js filename=intro
$(false, 1);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false, 1);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let arg = 1;
    let a = { a: 999, b: 1000 };
    a = !arg;
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
  let a = { a: 999, b: 1000 };
  a = !arg;
  $(a, arg);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( false, 1 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
