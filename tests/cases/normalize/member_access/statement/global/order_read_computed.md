# Preval test case

# order_read_computed.md

> Normalize > Member access > Statement > Global > Order read computed
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

$(obj)[$('x')];
`````


## Settled


`````js filename=intro
const obj /*:object*/ = {
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
const tmpCompObj /*:unknown*/ = $(obj);
const tmpCalleeParam /*:unknown*/ = $(`x`);
tmpCompObj[tmpCalleeParam];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompObj = $({
  get x() {
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    $(20);
  },
});
const tmpCalleeParam = $(`x`);
tmpCompObj[tmpCalleeParam];
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
c[ d ];
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
const tmpCompObj = $(obj);
const tmpCalleeParam = $(`x`);
tmpCompObj[tmpCalleeParam];
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
