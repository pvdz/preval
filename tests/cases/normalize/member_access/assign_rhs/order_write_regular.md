# Preval test case

# order_write_regular.md

> Normalize > Member access > Assign rhs > Order write regular
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

let x = 10;
x = $(obj).x = 30;
$(x);
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
const tmpNestedAssignObj /*:unknown*/ = $(obj);
tmpNestedAssignObj.x = 30;
$(30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObj = $({
  get x() {
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    $(20);
  },
});
tmpNestedAssignObj.x = 30;
$(30);
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
c.x = 30;
$( 30 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 20
 - 3: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
