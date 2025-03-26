# Preval test case

# func_nested_var_simple.md

> Normalize > Nullish > Func nested var simple
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = $(2) ?? implicitA,
        c = b ?? implicitB
  return $(c);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = b == null;
let c /*:unknown*/ = undefined;
let tmpIfTest$1 /*:boolean*/ = false;
if (tmpIfTest) {
  c = implicitA;
  tmpIfTest$1 = c == null;
} else {
  c = b;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(implicitB);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(c);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
const tmpIfTest = b == null;
let c = undefined;
let tmpIfTest$1 = false;
if (tmpIfTest) {
  c = implicitA;
  tmpIfTest$1 = c == null;
} else {
  c = b;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  $($(implicitB));
} else {
  $($(c));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = a == null;
let c = undefined;
let d = false;
if (b) {
  c = implicitA;
  d = c == null;
}
else {
  c = a;
  d = a == null;
}
if (d) {
  const e = $( implicitB );
  $( e );
}
else {
  const f = $( c );
  $( f );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

implicitA, implicitB


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
