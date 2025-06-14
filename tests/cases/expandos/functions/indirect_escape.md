# Preval test case

# indirect_escape.md

> Expandos > Functions > Indirect escape
>
> This test should remind us that functions can be instantiated multiple times concurrently and that a single store for bindings will not suffice

## Input

`````js filename=intro
function g(a) {
  function f() {
    $(a, 'inner');
    return a
  }
  if ($) {
    f.foo = a;
    $(f.foo, 'init');
  }
  return function() {
    return f();
  }
}
$(g(1)(), 'outer');
$(g(2)(), 'outer');
$(g(3)(), 'outer');
$(g(4)(), 'outer');
`````


## Settled


`````js filename=intro
const g /*:(number)=>function*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  const f /*:()=>number*/ = function () {
    debugger;
    $(a, `inner`);
    return a;
  };
  if ($) {
    f.foo = a;
    const tmpCalleeParam /*:unknown*/ = f.foo;
    $(tmpCalleeParam, `init`);
  } else {
  }
  const tmpReturnArg /*:()=>number*/ = function () {
    debugger;
    $(a, `inner`);
    return a;
  };
  return tmpReturnArg;
};
const tmpCallComplexCallee /*:function*/ /*truthy*/ = g(1);
const tmpCalleeParam$1 /*:unknown*/ = tmpCallComplexCallee();
$(tmpCalleeParam$1, `outer`);
const tmpCallComplexCallee$1 /*:function*/ /*truthy*/ = g(2);
const tmpCalleeParam$3 /*:unknown*/ = tmpCallComplexCallee$1();
$(tmpCalleeParam$3, `outer`);
const tmpCallComplexCallee$3 /*:function*/ /*truthy*/ = g(3);
const tmpCalleeParam$5 /*:unknown*/ = tmpCallComplexCallee$3();
$(tmpCalleeParam$5, `outer`);
const tmpCallComplexCallee$5 /*:function*/ /*truthy*/ = g(4);
const tmpCalleeParam$7 /*:unknown*/ = tmpCallComplexCallee$5();
$(tmpCalleeParam$7, `outer`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function (a) {
  const f = function () {
    $(a, `inner`);
    return a;
  };
  if ($) {
    f.foo = a;
    $(f.foo, `init`);
  }
  const tmpReturnArg = function () {
    $(a, `inner`);
    return a;
  };
  return tmpReturnArg;
};
const tmpCallComplexCallee = g(1);
$(tmpCallComplexCallee(), `outer`);
const tmpCallComplexCallee$1 = g(2);
$(tmpCallComplexCallee$1(), `outer`);
const tmpCallComplexCallee$3 = g(3);
$(tmpCallComplexCallee$3(), `outer`);
const tmpCallComplexCallee$5 = g(4);
$(tmpCallComplexCallee$5(), `outer`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = function() {
    debugger;
    $( b, "inner" );
    return b;
  };
  if ($) {
    c.foo = b;
    const d = c.foo;
    $( d, "init" );
  }
  const e = function() {
    debugger;
    $( b, "inner" );
    return b;
  };
  return e;
};
const f = a( 1 );
const g = f();
$( g, "outer" );
const h = a( 2 );
const i = h();
$( i, "outer" );
const j = a( 3 );
const k = j();
$( k, "outer" );
const l = a( 4 );
const m = l();
$( m, "outer" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function ($$0) {
  let a = $$0;
  debugger;
  let f = function () {
    debugger;
    $(a, `inner`);
    return a;
  };
  if ($) {
    f.foo = a;
    let tmpCalleeParam = f.foo;
    $(tmpCalleeParam, `init`);
  } else {
  }
  const tmpReturnArg = function () {
    debugger;
    const tmpReturnArg$1 = f();
    return tmpReturnArg$1;
  };
  return tmpReturnArg;
};
const tmpCallComplexCallee = g(1);
let tmpCalleeParam$1 = tmpCallComplexCallee();
$(tmpCalleeParam$1, `outer`);
const tmpCallComplexCallee$1 = g(2);
let tmpCalleeParam$3 = tmpCallComplexCallee$1();
$(tmpCalleeParam$3, `outer`);
const tmpCallComplexCallee$3 = g(3);
let tmpCalleeParam$5 = tmpCallComplexCallee$3();
$(tmpCalleeParam$5, `outer`);
const tmpCallComplexCallee$5 = g(4);
let tmpCalleeParam$7 = tmpCallComplexCallee$5();
$(tmpCalleeParam$7, `outer`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'init'
 - 2: 1, 'inner'
 - 3: 1, 'outer'
 - 4: 2, 'init'
 - 5: 2, 'inner'
 - 6: 2, 'outer'
 - 7: 3, 'init'
 - 8: 3, 'inner'
 - 9: 3, 'outer'
 - 10: 4, 'init'
 - 11: 4, 'inner'
 - 12: 4, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
