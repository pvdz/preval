# Preval test case

# all.md

> Super > Call > All

## Options

- skipEval
- globals: x

## Input

`````js filename=intro
class A {
  constructor(x) {
    $('A:', x);
  }
}
class B extends A {
  constructor() {
    // Just want to confirm how these are transformed:
    $(super(1));
    $(super(1, ...x, 2));
    $(super.foo());
    $(super.foo(1, ...x, 2));
    $(super[foo]());
    $(super[foo](1, ...x, 2));
    $(super.foo);
    $(super[foo]);
  }
}
new B();
`````


## Settled


`````js filename=intro
const A /*:class*/ /*truthy*/ = class {
  constructor($$0) {
    const x$1 /*:unknown*/ = $$0;
    debugger;
    $(`A:`, x$1);
    return undefined;
  }
};
const B /*:class*/ /*truthy*/ = class extends A {
  constructor() {
    debugger;
    const tmpCalleeParam /*:unknown*/ = super(1);
    $(tmpCalleeParam);
    const tmpCalleeParam$1 /*:unknown*/ = super(1, ...x, 2);
    $(tmpCalleeParam$1);
    const tmpCalleeParam$3 /*:unknown*/ = super.foo();
    $(tmpCalleeParam$3);
    const tmpCalleeParam$5 /*:unknown*/ = super.foo(1, ...x, 2);
    $(tmpCalleeParam$5);
    const tmpCalleeParam$7 /*:unknown*/ = super[foo]();
    $(tmpCalleeParam$7);
    const tmpCalleeParam$9 /*:unknown*/ = super[foo](1, ...x, 2);
    $(tmpCalleeParam$9);
    const tmpCalleeParam$11 /*:unknown*/ = super.foo;
    $(tmpCalleeParam$11);
    const tmpCalleeParam$13 /*:unknown*/ = super[foo];
    $(tmpCalleeParam$13);
    return undefined;
  }
};
new B();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const A = class {
  constructor(x$1) {
    $(`A:`, x$1);
  }
};
const B = class extends A {
  constructor() {
    $(super(1));
    $(super(1, ...x, 2));
    $(super.foo());
    $(super.foo(1, ...x, 2));
    $(super[foo]());
    $(super[foo](1, ...x, 2));
    $(super.foo);
    $(super[foo]);
  }
};
new B();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
constructor( $$0 ) {
  const b = $$0;
  debugger;
  $( "A:", b );
  return undefined;
}
};
const c = class   {
constructor(  ) {
  debugger;
  const d = super( 1 );
  $( d );
  const e = super( 1, ...x, 2 );
  $( e );
  const f = super.foo();
  $( f );
  const g = super.foo( 1, ...x, 2 );
  $( g );
  const h = super[ foo ]();
  $( h );
  const i = super[ foo ]( 1, ...x, 2 );
  $( i );
  const j = super.foo;
  $( j );
  const k = super[foo];
  $( k );
  return undefined;
}
};
new c();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let A = class {
  constructor($$0) {
    let x$1 = $$0;
    debugger;
    $(`A:`, x$1);
    return undefined;
  }
};
let B = class extends A {
  constructor() {
    debugger;
    let tmpCalleeParam = super(1);
    $(tmpCalleeParam);
    let tmpCalleeParam$1 = super(1, ...x, 2);
    $(tmpCalleeParam$1);
    let tmpCalleeParam$3 = super.foo();
    $(tmpCalleeParam$3);
    let tmpCalleeParam$5 = super.foo(1, ...x, 2);
    $(tmpCalleeParam$5);
    let tmpCalleeParam$7 = super[foo]();
    $(tmpCalleeParam$7);
    let tmpCalleeParam$9 = super[foo](1, ...x, 2);
    $(tmpCalleeParam$9);
    let tmpCalleeParam$11 = super.foo;
    $(tmpCalleeParam$11);
    let tmpCalleeParam$13 = super[foo];
    $(tmpCalleeParam$13);
    return undefined;
  }
};
new B();
`````


## Todos triggered


- (todo) Encountered non-ident as callee
- (todo) infertyping on a non-ident? is that a crash or bug? MemberExpression
- (todo) infertyping on a non-ident? is that a crash or bug? Super
- (todo) when we are still receiving method calls in typed tracked tricks?


## Globals


BAD@! Found 1 implicit global bindings:

foo


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
