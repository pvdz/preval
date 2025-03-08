# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = ++b) ? $(100) : $(200));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(2, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = ++b) ? $(100) : $(200));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = b;
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 2, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
