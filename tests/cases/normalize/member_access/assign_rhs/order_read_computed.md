# Preval test case

# order_read_computed.md

> Normalize > Member access > Assign rhs > Order read computed
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

let x = 10;
x = $(obj)[$('x')];
$(x);
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
const tmpAssignRhsCompObj /*:unknown*/ = $(obj);
const tmpAssignRhsCompProp /*:unknown*/ = $(`x`);
const x /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompObj = $({
  get x() {
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    $(20);
  },
});
const tmpAssignRhsCompProp = $(`x`);
$(tmpAssignRhsCompObj[tmpAssignRhsCompProp]);
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
const e = c[ d ];
$( e );
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
let x = 10;
const tmpAssignRhsCompObj = $(obj);
const tmpAssignRhsCompProp = $(`x`);
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 10
 - 4: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
