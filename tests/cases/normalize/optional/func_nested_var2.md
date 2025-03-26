# Preval test case

# func_nested_var2.md

> Normalize > Optional > Func nested var2

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
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.toString;
  b = tmpChainElementObject;
  tmpChainRootProp$1 = tmpChainElementObject;
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
  const tmpChainElementObject = tmpChainRootProp.toString;
  b = tmpChainElementObject;
  tmpChainRootProp$1 = tmpChainElementObject;
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
  const e = b.toString;
  a = e;
  d = e;
}
const f = a == null;
if (f) {
  $( undefined );
}
else {
  const g = d.length;
  $( g );
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
