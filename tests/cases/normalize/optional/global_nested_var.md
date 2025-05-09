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
let b /*:unknown*/ = undefined;
const tmpChainRootProp /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpChainRootProp$1 /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  b = tmpChainRootProp.toString;
  tmpChainRootProp$1 = b;
}
const tmpIfTest$1 /*:boolean*/ = b == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainRootProp$1.length;
  $(tmpChainElementObject$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = undefined;
const tmpChainRootProp = $(2);
const tmpIfTest = tmpChainRootProp == null;
let tmpChainRootProp$1 = undefined;
if (!tmpIfTest) {
  b = tmpChainRootProp.toString;
  tmpChainRootProp$1 = b;
}
if (b == null) {
  $(undefined);
} else {
  $(tmpChainRootProp$1.length);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 2 );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  a = b.toString;
  d = a;
}
const e = a == null;
if (e) {
  $( undefined );
}
else {
  const f = d.length;
  $( f );
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
