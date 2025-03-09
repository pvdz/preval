# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? (40, 50, 60) : $($(100))) || $(100));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(1);
let tmpCalleeParam /*:unknown*/ = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpCalleeParam = a;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 60;
const tmpIfTest = $(1);
let tmpCalleeParam = 60;
if (!tmpIfTest) {
  a = $($(100));
  tmpCalleeParam = a;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  $($(100));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? (40, 50, 60) : $($(100))) || $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 60;
const b = $( 1 );
let c = 60;
if (b) {

}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
if (a) {
  $( c );
  $( a );
}
else {
  const e = $( 100 );
  $( e );
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
