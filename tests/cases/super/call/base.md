# Preval test case

# base.md

> Super > Call > Base
>
>

## Input

`````js filename=intro
class A {
  constructor(x) {
    $('A:', x);
  }
}
class B extends A {
  constructor() {
    super(1);
  }
}
new B();
`````


## Settled


`````js filename=intro
const A /*:class*/ = class {
  constructor($$0) {
    const x /*:unknown*/ = $$0;
    debugger;
    $(`A:`, x);
    return undefined;
  }
};
const B /*:class*/ = class extends A {
  constructor() {
    debugger;
    super(1);
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
    $(`A:`, x);
  }
};
const B = class extends A {
  constructor() {
    super(1);
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
  super( 1 );
  return undefined;
}
};
new c();
`````


## Todos triggered


- (todo) Encountered non-ident as callee


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A:', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
