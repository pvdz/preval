# Preval test case

# implied.md

> Tofix > implied

At the time of writing, b is unknown but xyz knows the truthy value of xyz==null.
So in the else branch, b==null is still false as per xyz being false.
There's something here and I think I've got some other things lined up that may
cover or supersede this. But still.

## Input

`````js filename=intro
const b /*:unknown*/ = $(2);
const xyz /*:boolean*/ = b == null;
let c /*:unknown*/ /*ternaryConst*/ = undefined;
let pqr /*:boolean*/ /*ternaryConst*/ = false;
if (xyz) {
  c = toString;
  pqr = c == null;
} else {
  c = b;
  pqr = b == null;          // <- since xyz=false, ergo !(b==null), so this is false
}
if (pqr) {
  $(length);
} else {
  $(c);
}
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
const xyz /*:boolean*/ = b == null;
let c /*:unknown*/ /*ternaryConst*/ = undefined;
let pqr /*:boolean*/ /*ternaryConst*/ = false;
if (xyz) {
  c = toString;
  pqr = c == null;
} else {
  c = b;
  pqr = b == null;
}
if (pqr) {
  $(length);
} else {
  $(c);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
const xyz = b == null;
let c = undefined;
let pqr = false;
if (xyz) {
  c = toString;
  pqr = c == null;
} else {
  c = b;
  pqr = b == null;
}
if (pqr) {
  $(length);
} else {
  $(c);
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
  c = toString;
  d = c == null;
}
else {
  c = a;
  d = a == null;
}
if (d) {
  $( length );
}
else {
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const b = $(2);
const xyz = b == null;
let c = undefined;
let pqr = false;
if (xyz) {
  c = toString;
  pqr = c == null;
} else {
  c = b;
  pqr = b == null;
}
if (pqr) {
  $(length);
} else {
  $(c);
}
`````


## Todos triggered


None


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
