# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident unary void complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = void $(100);
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
$(100);
$(undefined);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(undefined);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = void $(100);
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(100);
  let a = undefined;
  $(undefined);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( undefined );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
