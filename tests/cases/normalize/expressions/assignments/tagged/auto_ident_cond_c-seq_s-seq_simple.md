# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)))} after`;
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$3);
}
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 60;
if (!$(30)) {
  a = $($(100));
}
$([`before `, ` after`], a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
}
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 60;
const b = $( 30 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
const d = [ "before ", " after" ];
$( d, a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 30
 - 2: ['before ', ' after'], 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
