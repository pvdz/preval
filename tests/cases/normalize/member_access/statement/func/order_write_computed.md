# Preval test case

# order_write_computed.md

> Normalize > Member access > Statement > Func > Order write computed
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
function f() {
  const obj = {
    get x() { return $(10); },
    set x(_) { $(20); },
  };

  $(obj)[$('x')] = 30;
}
$(f());
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
const tmpAssignComMemLhsObj /*:unknown*/ = $(obj);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 30;
$(undefined);
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
$(undefined);
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
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 20
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
