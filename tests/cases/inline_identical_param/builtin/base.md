# Preval test case

# base.md

> Inline identical param > Builtin > Base
>
> When a function is always called with a certain primitive for a certain parameter then we can inline this safely in many cases.

In this case the param can also be eliminated. But that's not always possible, like with `arguments.length` (unless that is also replaced with the actual count).

## Input

`````js filename=intro
function f(a, b, c) {
  if ($) {
    $(a, b, c, 'hopefully b is a literal afterwards');
  }
}
f(1, $object_valueOf, 3);
f(4, $object_valueOf, 5);
f(6, $object_valueOf, 7);
f(8, $object_valueOf, 9);
`````


## Settled


`````js filename=intro
const f /*:(number, number)=>undefined*/ = function ($$0, $$1) {
  const a /*:number*/ = $$0;
  const c /*:number*/ = $$1;
  debugger;
  if ($) {
    $(a, $object_valueOf, c, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f(1, 3);
f(4, 5);
f(6, 7);
f(8, 9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a, c) {
  if ($) {
    $(a, $object_valueOf, c, `hopefully b is a literal afterwards`);
  }
};
f(1, 3);
f(4, 5);
f(6, 7);
f(8, 9);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  if ($) {
    $( b, $object_valueOf, c, "hopefully b is a literal afterwards" );
    return undefined;
  }
  else {
    return undefined;
  }
};
a( 1, 3 );
a( 4, 5 );
a( 6, 7 );
a( 8, 9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  if ($) {
    $(a, b, c, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f(1, $object_valueOf, 3);
f(4, $object_valueOf, 5);
f(6, $object_valueOf, 7);
f(8, $object_valueOf, 9);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, '<function>', 3, 'hopefully b is a literal afterwards'
 - 2: 4, '<function>', 5, 'hopefully b is a literal afterwards'
 - 3: 6, '<function>', 7, 'hopefully b is a literal afterwards'
 - 4: 8, '<function>', 9, 'hopefully b is a literal afterwards'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
