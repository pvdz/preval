# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b) ? $(100) : $(200));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpSSA_tmpCalleeParam);
$(1, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(1, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 1, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
a = b;
const tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, b);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
