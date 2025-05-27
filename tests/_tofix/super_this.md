# Preval test case

# super_this.md

> Tofix > super this
>
> Oh no, this will ruin everything.

existing test case

denorm should restore `this` aliases with the keyword

## Input

`````js filename=intro
class A {
  constructor(x) {
    $('A:', x, this);
  }
}
class B extends A {
  constructor() {
    const a = $('important');
    const x = super(a);
    $(x, this); // <-- this will cause an alias before super(), which is illegal
  }
}
new B();
`````


## Settled


`````js filename=intro
const A /*:class*/ = class {
  constructor($$0) {
    const tmpPrevalAliasThis /*:object*/ = this;
    const x /*:unknown*/ = $$0;
    debugger;
    $(`A:`, x, tmpPrevalAliasThis);
    return undefined;
  }
};
const B /*:class*/ = class extends A {
  constructor() {
    const tmpPrevalAliasThis$1 /*:object*/ = this;
    debugger;
    const a /*:unknown*/ = $(`important`);
    const x$1 /*:unknown*/ = super(a);
    $(x$1, tmpPrevalAliasThis$1);
    return undefined;
  }
};
new B();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const A = class {
  constructor(x) {
    $(`A:`, x, this);
  }
};
const B = class extends A {
  constructor() {
    const tmpPrevalAliasThis$1 = this;
    const a = $(`important`);
    $(super(a), tmpPrevalAliasThis$1);
  }
};
new B();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
constructor( $$0 ) {
  const b = this;
  const c = $$0;
  debugger;
  $( "A:", c, b );
  return undefined;
}
};
const d = class   {
constructor(  ) {
  const e = this;
  debugger;
  const f = $( "important" );
  const g = super( f );
  $( g, e );
  return undefined;
}
};
new d();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let A = class {
  constructor($$0) {
    const tmpPrevalAliasThis = this;
    let x = $$0;
    debugger;
    $(`A:`, x, tmpPrevalAliasThis);
    return undefined;
  }
};
let B = class extends A {
  constructor() {
    const tmpPrevalAliasThis$1 = this;
    debugger;
    const a = $(`important`);
    const x$1 = super(a);
    $(x$1, tmpPrevalAliasThis$1);
    return undefined;
  }
};
new B();
`````


## Todos triggered


- (todo) Encountered non-ident as callee
- (todo) infertyping on a non-ident? is that a crash or bug? Super


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'important'
 - 2: 'A:', 'important', {}
 - 3: {}, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - !eval returned: ("<crash[ Must call super constructor in derived class before accessing 'this' or returning from derived constructor ]>")

Post settled calls: BAD!!
 - !eval returned: ("<crash[ Must call super constructor in derived class before accessing 'this' or returning from derived constructor ]>")

Denormalized calls: BAD!!
 - !eval returned: ("<crash[ Must call super constructor in derived class before accessing 'this' or returning from derived constructor ]>")
