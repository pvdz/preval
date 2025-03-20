# Preval test case

# nested.md

> Expandos > Functions > Nested
>
> Basic expando stuff

## Input

`````js filename=intro
function g(a) {
  // Nested functions should be ignored for now
  function f() {
    $(a);
  }
  if ($) {
    f.foo = a;
    $(f.foo);
  }
}
g(1);
g(2);
g(3);
g(4);
`````


## Settled


`````js filename=intro
const g /*:(number)=>undefined*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  const f /*:()=>undefined*/ = function () {
    debugger;
    $(a);
    return undefined;
  };
  if ($) {
    f.foo = a;
    const tmpCalleeParam /*:unknown*/ = f.foo;
    $(tmpCalleeParam);
    return undefined;
  } else {
    return undefined;
  }
};
g(1);
g(2);
g(3);
g(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function (a) {
  const f = function () {
    $(a);
  };
  if ($) {
    f.foo = a;
    $(f.foo);
  }
};
g(1);
g(2);
g(3);
g(4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = function() {
    debugger;
    $( b );
    return undefined;
  };
  if ($) {
    c.foo = b;
    const d = c.foo;
    $( d );
    return undefined;
  }
  else {
    return undefined;
  }
};
a( 1 );
a( 2 );
a( 3 );
a( 4 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
