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
const A /*:class*/ = class {};
const B /*:class*/ = class extends A {
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
