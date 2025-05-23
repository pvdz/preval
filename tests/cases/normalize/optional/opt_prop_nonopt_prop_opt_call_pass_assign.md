# Preval test case

# opt_prop_nonopt_prop_opt_call_pass_assign.md

> Normalize > Optional > Opt prop nonopt prop opt call pass assign
>
> Make sure this works properly

## Input

`````js filename=intro
let x = 100;
const a = {b: {c: $}};
x = a?.b.c?.(1);
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpObjLitVal /*:object*/ = { c: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal, `c`, 1);
  $(tmpChainElementCall);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(undefined);
} else {
  $($dotCall($, { c: $ }, `c`, 1));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( undefined );
}
else {
  const b = { c: $ };
  const c = $dotCall( $, b, "c", 1 );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 100;
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
x = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 1);
    x = tmpChainElementCall;
    $(tmpChainElementCall);
  } else {
    $(x);
  }
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
