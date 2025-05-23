# Preval test case

# func_nested_var3.md

> Normalize > Optional > Func nested var3

This was: `const a = 10, b = (a, $(2))?.toString, c = (1, b)?.length; $(c);`

## Input

`````js filename=intro
let b /*:unknown*/ = undefined;
const objb /*:unknown*/ = $(2);
const btest /*:boolean*/ = objb == null;
let aliasb /*:unknown*/ = undefined;
if (btest) {
} else {
  const actualb /*:unknown*/ = objb.toString; // <-- This is not an ident so dealiasing wont work 
  b = actualb;
  aliasb = actualb;
}
const ctest /*:boolean*/ = b == null;
if (ctest) {
  $(undefined);
} else {
  const c /*:unknown*/ = aliasb.length;
  $(c);
}
`````


## Settled


`````js filename=intro
let b /*:unknown*/ /*ternaryConst*/ = undefined;
const objb /*:unknown*/ = $(2);
const btest /*:boolean*/ = objb == null;
let aliasb /*:unknown*/ /*ternaryConst*/ = undefined;
if (btest) {
} else {
  const actualb /*:unknown*/ = objb.toString;
  b = actualb;
  aliasb = actualb;
}
const ctest /*:boolean*/ = b == null;
if (ctest) {
  $(undefined);
} else {
  const c /*:unknown*/ = aliasb.length;
  $(c);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = undefined;
const objb = $(2);
const btest = objb == null;
let aliasb = undefined;
if (!btest) {
  const actualb = objb.toString;
  b = actualb;
  aliasb = actualb;
}
if (b == null) {
  $(undefined);
} else {
  $(aliasb.length);
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
