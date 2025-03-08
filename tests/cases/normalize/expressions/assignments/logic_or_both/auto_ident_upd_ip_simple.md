# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b++) || (a = b++));
$(a, b);
`````

## Settled


`````js filename=intro
$(1);
$(1, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = b++) || (a = b++));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = tmpPostUpdArgIdent;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpPostUpdArgIdent$1 = $coerce(b, `number`);
  b = tmpPostUpdArgIdent$1 + 1;
  const tmpNestedComplexRhs = tmpPostUpdArgIdent$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
