# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), x)) ? $(100) : $(200));
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpSSA_tmpCalleeParam);
$(1, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$($(100));
$(1, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 100 );
$( a );
$( 1, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
$(1);
$(2);
a = x;
const tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, x);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 100
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
