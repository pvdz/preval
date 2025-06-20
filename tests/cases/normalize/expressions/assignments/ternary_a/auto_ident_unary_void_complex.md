# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) ? $(100) : $(200));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpSSA_tmpCalleeParam /*:unknown*/ = $(200);
$(tmpSSA_tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$($(200));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 200 );
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
$(100);
a = undefined;
const tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: 200
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
