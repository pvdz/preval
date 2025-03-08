# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > For b > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; b++; $(1));
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:number*/ = 12;
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const tmpPostUpdArgIdent$1 /*:unknown*/ = b;
  b = b + 1;
  if (tmpPostUpdArgIdent$1) {
  } else {
    break;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 12;
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
while (true) {
  $(1);
  const tmpPostUpdArgIdent$1 = b;
  b = b + 1;
  if (!tmpPostUpdArgIdent$1) {
    break;
  }
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  while (b++) {
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent + 1;
  const tmpIfTest = tmpPostUpdArgIdent;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 12;
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const b = a;
  a = a + 1;
  if (b) {

  }
  else {
    break;
  }
}
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
