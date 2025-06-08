# Preval test case

# base_prop_noop.md

> Super > Prop > Base prop noop
>
>

## Input

`````js filename=intro
class A {}
class B extends A {
  constructor() {
    $(super.foo);
  }
}
$(B);
`````


## Settled


`````js filename=intro
const A /*:class*/ /*truthy*/ = class {};
const B /*:class*/ /*truthy*/ = class extends A {
  constructor() {
    debugger;
    const tmpCalleeParam /*:unknown*/ = super.foo;
    $(tmpCalleeParam);
    return undefined;
  }
};
$(B);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const A = class {};
$(
  class extends A {
    constructor() {
      $(super.foo);
    }
  },
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {

};
const b = class   {
constructor(  ) {
  debugger;
  const c = super.foo;
  $( c );
  return undefined;
}
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let A = class {};
let B = class extends A {
  constructor() {
    debugger;
    let tmpCalleeParam = super.foo;
    $(tmpCalleeParam);
    return undefined;
  }
};
$(B);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
