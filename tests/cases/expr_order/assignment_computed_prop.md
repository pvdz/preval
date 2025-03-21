# Preval test case

# assignment_computed_prop.md

> Expr order > Assignment computed prop
>
> The object is evaluated before the computed property

## Input

`````js filename=intro
let b = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};

$(b)[$('c')] = $(3);
`````


## Settled


`````js filename=intro
const b /*:object*/ = {
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
const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
const tmpAssignComputedRhs /*:unknown*/ = $(3);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignComMemLhsObj = $({
  get c() {
    $(`get`);
  },
  set c($$0) {
    $(`set`);
  },
});
const tmpAssignComMemLhsProp = $(`c`);
const tmpAssignComputedRhs = $(3);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
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
const c = $( "c" );
const d = $( 3 );
b[c] = d;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '<get/set>' }
 - 2: 'c'
 - 3: 3
 - 4: 'set'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
