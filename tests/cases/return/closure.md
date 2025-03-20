# Preval test case

# closure.md

> Return > Closure
>
> If a function returns a closure that is accessible from the caller, the closure should be outlined...

## Input

`````js filename=intro
function f() {
  let x = 0;
  function g() {
    ++x;
    return x;
  }

  $(g());
  $(g());
  $(g());
}
$(f())
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(1);
  $(2);
  $(3);
  return undefined;
};
f();
$(undefined);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(1);
  $(2);
  $(3);
};
f();
$(undefined);
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 1 );
  $( 2 );
  $( 3 );
  return undefined;
};
a();
$( undefined );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: undefined
 - 5: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
