# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $(1) ? (40, 50, $(60)) : $($(100)));
$(xyz);
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  a = $(60);
  $(a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
  $(a);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if ($(1)) {
  a = $(60);
  $(a);
} else {
  a = $($(100));
  $(a);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $(1) ? (40, 50, $(60)) : $($(100)));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
let xyz = a;
$(a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = $( 60 );
  $( a );
}
else {
  const c = $( 100 );
  a = $( c );
  $( a );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
