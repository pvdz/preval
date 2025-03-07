# Preval test case

# order_write_computed.md

> Normalize > Member access > Var init > Order write computed
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

let x = $(obj)[$('x')] = 30;
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
const varInitAssignLhsComputedObj /*:unknown*/ = $(obj);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 30;
$(30);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $({
  get x() {
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    $(20);
  },
});
const varInitAssignLhsComputedProp = $(`x`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 30;
$(30);
`````

## Pre Normal


`````js filename=intro
const obj = {
  get x() {
    debugger;
    return $(10);
  },
  set x($$0) {
    let _ = $$0;
    debugger;
    $(20);
  },
};
let x = ($(obj)[$(`x`)] = 30);
$(x);
`````

## Normalized


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
const varInitAssignLhsComputedObj = $(obj);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedRhs = 30;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let x = varInitAssignLhsComputedRhs;
$(x);
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
$( 30 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 20
 - 4: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
