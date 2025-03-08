# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(0)) || 2)} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$3);
if (a) {
} else {
  a = 2;
}
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (!a) {
  a = 2;
}
$([`before `, ` after`], a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $($(0)) || 2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = $(0);
a = $(tmpCalleeParam$3);
if (a) {
} else {
  a = 2;
}
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  b = 2;
}
const c = [ "before ", " after" ];
$( c, b );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: ['before ', ' after'], 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
