# Preval test case

# base_call_noop.md

> Super > Call > Base call noop
>
>

## Input

`````js filename=intro
class A {
  constructor() {
    $('cA');
  }
}
class B extends A {
  constructor() {
    $('inner', super());
    $('cB');
  }
}
$('outer', new B());
`````


## Settled


`````js filename=intro
const A /*:class*/ = class {
  constructor() {
    debugger;
    $(`cA`);
    return undefined;
  }
};
const B /*:class*/ = class extends A {
  constructor() {
    debugger;
    const tmpCalleeParam /*:unknown*/ = super();
    $(`inner`, tmpCalleeParam);
    $(`cB`);
    return undefined;
  }
};
const tmpCalleeParam$1 /*:object*/ = new B();
$(`outer`, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const A = class {
  constructor() {
    $(`cA`);
  }
};
const B = class extends A {
  constructor() {
    $(`inner`, super());
    $(`cB`);
  }
};
$(`outer`, new B());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
constructor(  ) {
  debugger;
  $( "cA" );
  return undefined;
}
};
const b = class   {
constructor(  ) {
  debugger;
  const c = super();
  $( "inner", c );
  $( "cB" );
  return undefined;
}
};
const d = new b();
$( "outer", d );
`````


## Todos triggered


- (todo) Encountered non-ident as callee
- (todo) infertyping on a non-ident? is that a crash or bug? Super


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cA'
 - 2: 'inner', {}
 - 3: 'cB'
 - 4: 'outer', {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
