# Preval test case

# assignment_reg_prop.md

> Expr order > Assignment reg prop
>
> Object evals before rhs

## Input

`````js filename=intro
let b = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};

$(b).c = $(2);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    debugger;
    $(`set`);
    return undefined;
  },
};
const tmpAssignMemLhsObj$1 /*:unknown*/ = $(b);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignMemLhsObj$1 = $({
  get c() {
    $(`get`);
  },
  set c($$0) {
    $(`set`);
  },
});
tmpAssignMemLhsObj$1.c = $(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  get c() {
    debugger;
    $( "get" );
    return undefined;
  },
  set c( $$0 ) {
    debugger;
    $( "set" );
    return undefined;
  },
};
const b = $( a );
const c = $( 2 );
b.c = c;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $(`set`);
    return undefined;
  },
};
const tmpAssignMemLhsObj = $(b);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '<get/set>' }
 - 2: 2
 - 3: 'set'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
