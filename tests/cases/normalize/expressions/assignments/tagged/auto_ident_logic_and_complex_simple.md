# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(1)) && 2)} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$3);
let tmpCalleeParam$1 /*:unknown*/ = 2;
if (a) {
  a = 2;
} else {
  tmpCalleeParam$1 = a;
}
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
let tmpCalleeParam$1 = 2;
if (a) {
  a = 2;
} else {
  tmpCalleeParam$1 = a;
}
$([`before `, ` after`], tmpCalleeParam$1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $($(1)) && 2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = $(1);
a = $(tmpCalleeParam$3);
if (a) {
  a = 2;
} else {
}
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
let c = 2;
if (b) {
  b = 2;
}
else {
  c = b;
}
const d = [ "before ", " after" ];
$( d, c );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: ['before ', ' after'], 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
