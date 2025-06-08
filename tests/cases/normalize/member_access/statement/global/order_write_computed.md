# Preval test case

# order_write_computed.md

> Normalize > Member access > Statement > Global > Order write computed
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

$(obj)[$('x')] = 30;
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = {
  get x() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    debugger;
    $(20);
    return undefined;
  },
};
const tmpAssignComMemLhsObj /*:unknown*/ = $(obj);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 30;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignComMemLhsObj = $({
  get x() {
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    $(20);
  },
});
const tmpAssignComMemLhsProp = $(`x`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 30;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  get x() {
    debugger;
    const b = $( 10 );
    return b;
  },
  set x( $$0 ) {
    debugger;
    $( 20 );
    return undefined;
  },
};
const c = $( a );
const d = $( "x" );
c[d] = 30;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = {
  get x() {
    debugger;
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    let _ = $$0;
    debugger;
    $(20);
    return undefined;
  },
};
const tmpAssignComMemLhsObj = $(obj);
const tmpAssignComMemLhsProp = $(`x`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 30;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
