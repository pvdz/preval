# Preval test case

# func_group_literal.md

> Normalize > Nullish > Func group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)??foo
  return $(y);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(3);
$(tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(3));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const y = (1, 2, 3) ?? foo;
  return $(y);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let y = 3;
  const tmpIfTest = y == null;
  if (tmpIfTest) {
    y = foo;
  } else {
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
