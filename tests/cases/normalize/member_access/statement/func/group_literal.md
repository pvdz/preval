# Preval test case

# group_literal.md

> Normalize > Member access > Statement > Func > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
function f() {
  ($(1), 2).foo;
}
$(f());
`````

## Settled


`````js filename=intro
$(1);
(2).foo;
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
(2).foo;
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  ($(1), 2).foo;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  const tmpCompObj = 2;
  tmpCompObj.foo;
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
2.foo;
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
