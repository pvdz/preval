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
  const a$1 /*:number*/ = $$0;
  debugger;
  if ($) {
    $(a$1);
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
const g = function (a$1) {
  if ($) {
    $(a$1);
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
  if ($) {
    $( b );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function ($$0) {
  let a = $$0;
  debugger;
  let f = function () {
    debugger;
    $(a);
    return undefined;
  };
  if ($) {
    f.foo = a;
    let tmpCalleeParam = f.foo;
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


## Todos triggered


None


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
