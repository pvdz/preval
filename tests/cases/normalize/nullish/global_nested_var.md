# Preval test case

# global_nested_var.md

> Normalize > Nullish > Global nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
const a = 10,
      b = (a, $(2))??toString,
      c = (1, b)??length
$(c);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = b == null;
let c /*:unknown*/ = undefined;
if (tmpIfTest) {
  b = toString;
  c = b;
} else {
  c = b;
}
const tmpIfTest$1 /*:boolean*/ = b == null;
if (tmpIfTest$1) {
  $(length);
} else {
  $(c);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = $(2);
const tmpIfTest = b == null;
let c = undefined;
if (tmpIfTest) {
  b = toString;
  c = b;
} else {
  c = b;
}
if (b == null) {
  $(length);
} else {
  $(c);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
const b = a == null;
let c = undefined;
if (b) {
  a = toString;
  c = a;
}
else {
  c = a;
}
const d = a == null;
if (d) {
  $( length );
}
else {
  $( c );
}
`````


## Globals


BAD@! Found 2 implicit global bindings:

toString, length


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
