# Preval test case

# order_read_computed.md

> Normalize > Member access > Statement > Func > Order read computed
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
function f() {
  const obj = {
    get x() { return $(10); },
    set x(_) { $(20); },
  };

  $(obj)[$('x')];
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
const tmpCompObj /*:unknown*/ = $(obj);
const tmpCalleeParam /*:unknown*/ = $(`x`);
tmpCompObj[tmpCalleeParam];
$(undefined);
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
c[ d ];
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
  const tmpCompObj = $(obj);
  const tmpCalleeParam = $(`x`);
  tmpCompObj[tmpCalleeParam];
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
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
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
