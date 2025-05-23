# Preval test case

# auto_prop_simple_simple3.md

> Normalize > Expressions > Assignments > Ternary c > Auto prop simple simple3
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
} else {
  const one = $(1);
  const obj = { b: one };
  a = obj;
}
a.b = 2;
$(a);
`````


## Settled


`````js filename=intro
let a /*:object*/ /*ternaryConst*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
} else {
  const one /*:unknown*/ = $(1);
  a = { b: one };
}
a.b = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
if (!$(0)) {
  const one = $(1);
  a = { b: one };
}
a.b = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 0 );
if (b) {

}
else {
  const c = $( 1 );
  a = { b: c };
}
a.b = 2;
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
