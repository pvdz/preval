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
const tmpReturnArg /*:unknown*/ = $(2);
$(tmpReturnArg);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  let tmpCalleeParam = f(1);
  $(tmpCalleeParam);
  return undefined;
};
let tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


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
