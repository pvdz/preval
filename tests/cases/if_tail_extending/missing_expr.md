# Preval test case

# missing_expr.md

> If tail extending > Missing expr
>
> The $(x) calls get shuffled around and the output looks odd compared to input

## Options

## Input

`````js filename=intro
let x = 20;
$(x); // 20
if ($(1)) {
  $(x); // 20
  x = 30; // overwrites the 20
}
$(x); // 20, 30
if ($(2)) {
  $(x); // 20, 30
  x = 40; // overwrites the 20 and 30
}
$(x); // 20, 30, 40
`````


## Settled


`````js filename=intro
let x /*:number*/ /*ternaryConst*/ /*truthy*/ = 20;
$(20);
const tmpIfTest /*:unknown*/ = $(1);
$(20);
if (tmpIfTest) {
  x = 30;
  $(30);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(2);
$(x);
if (tmpIfTest$1) {
  $(40);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 20;
$(20);
const tmpIfTest = $(1);
$(20);
if (tmpIfTest) {
  x = 30;
  $(30);
}
const tmpIfTest$1 = $(2);
$(x);
if (tmpIfTest$1) {
  $(40);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 20;
$( 20 );
const b = $( 1 );
$( 20 );
if (b) {
  a = 30;
  $( 30 );
}
const c = $( 2 );
$( a );
if (c) {
  $( 40 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 20;
$(x);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(x);
  x = 30;
  $(x);
} else {
  $(x);
}
const tmpIfTest$1 = $(2);
if (tmpIfTest$1) {
  $(x);
  x = 40;
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - 2: 1
 - 3: 20
 - 4: 30
 - 5: 2
 - 6: 30
 - 7: 40
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
