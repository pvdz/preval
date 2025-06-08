# Preval test case

# order_write_regular.md

> Normalize > Member access > Statement > Func > Order write regular
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
function f() {
  const obj = {
    get x() { return $(10); },
    set x(_) { $(20); },
  };

  $(obj).x = 30;
}
$(f());
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
const tmpAssignMemLhsObj /*:unknown*/ = $(obj);
tmpAssignMemLhsObj.x = 30;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignMemLhsObj = $({
  get x() {
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    $(20);
  },
});
tmpAssignMemLhsObj.x = 30;
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
c.x = 30;
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
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
  const tmpAssignMemLhsObj = $(obj);
  tmpAssignMemLhsObj.x = 30;
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 20
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
