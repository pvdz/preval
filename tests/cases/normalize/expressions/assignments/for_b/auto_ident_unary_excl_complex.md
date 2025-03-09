# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = !$(100)); $(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
if (tmpUnaryArg) {
  $(false);
} else {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpUnaryArg$1 /*:unknown*/ = $(100);
    if (tmpUnaryArg$1) {
      break;
    } else {
    }
  }
  $(false);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(100)) {
  $(false);
} else {
  while (true) {
    $(1);
    if ($(100)) {
      break;
    }
  }
  $(false);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = !$(100))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpUnaryArg = $(100);
  a = !tmpUnaryArg;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( false );
}
else {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const b = $( 100 );
    if (b) {
      break;
    }
  }
  $( false );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check