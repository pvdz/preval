# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(1)) && $($(2)))} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$3);
let tmpCalleeParam$1 /*:unknown*/ = undefined;
if (a) {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$5);
  tmpCalleeParam$1 = a;
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
let tmpCalleeParam$1 = undefined;
if (a) {
  a = $($(2));
  tmpCalleeParam$1 = a;
} else {
  tmpCalleeParam$1 = a;
}
$([`before `, ` after`], tmpCalleeParam$1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = $(1);
a = $(tmpCalleeParam$3);
if (a) {
  const tmpCalleeParam$5 = $(2);
  a = $(tmpCalleeParam$5);
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
let c = undefined;
if (b) {
  const d = $( 2 );
  b = $( d );
  c = b;
}
else {
  c = b;
}
const e = [ "before ", " after" ];
$( e, c );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: ['before ', ' after'], 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
