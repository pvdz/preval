# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b--));
$(a, b);
`````

## Settled


`````js filename=intro
$(100);
$(100);
$(0, -1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$(0, -1);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = b--)) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent - 1;
  a = tmpPostUpdArgIdent;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( 0, -1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 0, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check