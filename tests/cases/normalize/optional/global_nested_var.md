# Preval test case

# global_nested_var.md

> Normalize > Optional > Global nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
const a = 10,
      b = (a, $(2))?.toString,
      c = (1, b)?.length
$(c);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpChainRootProp /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpIfTest$1 /*:boolean*/ /*ternaryConst*/ = true;
if (tmpIfTest) {
} else {
  b = tmpChainRootProp.toString;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = b.length;
  $(tmpChainElementObject$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = undefined;
const tmpChainRootProp = $(2);
const tmpIfTest = tmpChainRootProp == null;
let tmpIfTest$1 = true;
if (!tmpIfTest) {
  b = tmpChainRootProp.toString;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  $(undefined);
} else {
  $(b.length);
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
  $( undefined );
}
else {
  const e = a.length;
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = 10;
let b = undefined;
const tmpChainRootProp = $(2);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.toString;
  b = tmpChainElementObject;
} else {
}
let c = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.length;
  c = tmpChainElementObject$1;
  $(tmpChainElementObject$1);
} else {
  $(c);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
