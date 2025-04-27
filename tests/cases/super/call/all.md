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
const A /*:class*/ = class {
  constructor($$0) {
    const x$1 /*:unknown*/ = $$0;
    debugger;
    $(`A:`, x$1);
    return undefined;
  }
};
const B /*:class*/ = class extends A {
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


## Todos triggered


- (todo) infertyping on a non-ident? is that a crash or bug? Super
- (todo) infertyping on a non-ident? is that a crash or bug? MemberExpression
- (todo) when we are still receiving method calls in typed tracked tricks?
- (todo) Encountered non-ident as callee


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
