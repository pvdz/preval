# Preval test case

# func_nested_var.md

> Normalize > Optional > Func nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = (a, $(2))?.toString,
        c = (1, b)?.length
  return $(c);
}
$(f());
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
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const c /*:unknown*/ = b.length;
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(c);
  $(tmpClusterSSA_tmpReturnArg$1);
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
