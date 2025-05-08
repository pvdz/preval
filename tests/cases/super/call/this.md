# Preval test case

# this.md

> Super > Call > This
>
> Oh no, this will ruin everything.

When a class is extended and has an explicit constructor, it must do a
super() call before accessing `this` and before returning.
Otherwise an error is thrown.

But we hoist and alias `this` refs to the function header.

We can't just hoist super() calls because code may precede it just fine. Its call
may depend on that code, either for arguments passed on or for global/closure access.

We can't mess with `this` in constructors when they have a super call.
Maybe we simply don't process constructors with a super call at all, or only in a
very very special way. Like maybe we abstract all code around it to a function
of sorts?

Or we ignore any constructor that contains `super()` beyond phase1? Can we even
do that? Many cases of access don't walk the AST but find references directly...

Edge case: a constructor with a loop that conditionally access `this` or 
calls `super()` and the order is relevant and observable because the wrong
order throws an error, but also calling `super()` twice throws an error, but
also never calling `super()` throws an error...

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
