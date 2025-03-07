# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident literal
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = "foo";
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
$(`foo`);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = `foo`;
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = `foo`;
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
