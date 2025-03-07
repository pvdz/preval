# Preval test case

# nested_after_use.md

> Normalize > Hoisting > Func > Nested after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(g());
function g() {
  $(f(1));
  function f() {
    return $(2);
  }
}
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(2);
$(tmpCalleeParam);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
$(undefined);
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return $(2);
  };
  $(f(1));
};
$(g());
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  const tmpCalleeParam = f(1);
  $(tmpCalleeParam);
  return undefined;
};
const tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
