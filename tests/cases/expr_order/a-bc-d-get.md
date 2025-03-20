# Preval test case

# a-bc-d-get.md

> Expr order > A-bc-d-get
>
> Double check whether this can't be broken

## Input

`````js filename=intro
let a = 1;
let b = {
  get c()  { $('should not be called'); }, 
  set c(x) { $('set'); },
};
let d = 3;
// This should _NOT_ crash. The getter is not invoked.
a = b.c = d;
$(a, b, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = {
  get c() {
    debugger;
    $(`should not be called`);
    return undefined;
  },
  set c($$0) {
    debugger;
    $(`set`);
    return undefined;
  },
};
b.c = 3;
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = {
  get c() {
    $(`should not be called`);
  },
  set c($$0) {
    $(`set`);
  },
};
b.c = 3;
$(3, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  get c() {
    debugger;
    $( "should not be called" );
    return undefined;
  },
  set c( $$0 ) {
    debugger;
    $( "set" );
    return undefined;
  },
};
a.c = 3;
$( 3, a, 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'set'
 - 2: 3, { c: '<get/set>' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
