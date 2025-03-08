# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b++) && (a = b++));
$(a, b);
`````

## Settled


`````js filename=intro
$(2);
$(2, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(2, 3);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = b++) && (a = b++));
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
  const tmpPostUpdArgIdent$1 = $coerce(b, `number`);
  b = tmpPostUpdArgIdent$1 + 1;
  const tmpNestedComplexRhs = tmpPostUpdArgIdent$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 2, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
