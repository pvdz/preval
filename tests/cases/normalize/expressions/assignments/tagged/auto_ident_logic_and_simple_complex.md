# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 1 && $($(1)))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
$([`before `, ` after`], a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = [ "before ", " after" ];
$( c, b );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: ['before ', ' after'], 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
