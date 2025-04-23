# Preval test case

# base_call.md

> Super > Base call
>
>

## Input

`````js filename=intro
class A {}
class B extends A {
  constructor() {
    $(super());
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
    $($super);
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
      $($super);
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
  $( $super );
  return undefined;
}
};
$( b );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

$super


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
