# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident logic or simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = 0 || 2;
    $(a);
  }
}
$(f());
`````

## Settled


`````js filename=intro
$(2);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let a = 0 || 2;
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = 0;
  if (a) {
  } else {
    a = 2;
  }
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
