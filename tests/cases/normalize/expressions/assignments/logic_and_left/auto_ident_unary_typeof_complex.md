# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(arg)) && $(100));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
const a /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$($(100));
$(typeof tmpUnaryArg, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 100 );
$( b );
const c = typeof a;
$( c, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, arg);
} else {
  $(tmpCalleeParam);
  $(a, arg);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
