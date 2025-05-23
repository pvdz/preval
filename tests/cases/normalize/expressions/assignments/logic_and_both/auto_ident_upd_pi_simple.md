# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = ++b) && (a = ++b));
$(a, b);
`````


## Settled


`````js filename=intro
$(3);
$(3, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(3, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 3, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = b;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpPostUpdArgIdent$1 = $coerce(b, `number`);
  b = tmpPostUpdArgIdent$1 + 1;
  const tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
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
 - 1: 3
 - 2: 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
