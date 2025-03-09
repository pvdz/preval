# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = ++b) || (a = ++b));
$(a, b);
`````

## Settled


`````js filename=intro
$(2);
$(2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(2, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = ++b) || (a = ++b));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = b;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  const tmpPostUpdArgIdent$1 = $coerce(b, `number`);
  b = tmpPostUpdArgIdent$1 + 1;
  const tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 2, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
