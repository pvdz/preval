# Preval test case

# func_nested_var_simple.md

> Normalize > Optional > Func nested var simple
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = $(2)?.toString,
        c = b?.length
  return $(c);
}
$(f());
`````


## Settled


`````js filename=intro
let b /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpIfTest$1 /*:boolean*/ /*ternaryConst*/ = true;
if (tmpIfTest) {
} else {
  b = tmpChainElementCall.toString;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_c /*:unknown*/ = b.length;
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(tmpClusterSSA_c);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = undefined;
const tmpChainElementCall = $(2);
const tmpIfTest = tmpChainElementCall == null;
let tmpIfTest$1 = true;
if (!tmpIfTest) {
  b = tmpChainElementCall.toString;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  $($(undefined));
} else {
  $($(b.length));
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 2 );
const c = b == null;
let d = true;
if (c) {

}
else {
  a = b.toString;
  d = a == null;
}
if (d) {
  const e = $( undefined );
  $( e );
}
else {
  const f = a.length;
  const g = $( f );
  $( g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const a = 10;
  let b = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(2);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.toString;
    b = tmpChainElementObject;
  } else {
  }
  let c = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp.length;
    c = tmpChainElementObject$1;
  } else {
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
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
 - 1: 2
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
