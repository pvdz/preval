# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = (a = ++$($(b)).x); ; $(1)) $(xyz);
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpUpdInc);
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUpdObj = $($({ x: 1 }));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
tmpUpdObj.x = tmpUpdInc;
while (true) {
  $(tmpUpdInc);
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let xyz = (a = ++$($(b)).x);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
let tmpUpdObj = $(tmpCalleeParam);
let tmpUpdProp = tmpUpdObj.x;
let tmpUpdNum = $coerce(tmpUpdProp, `number`);
let tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
a = tmpUpdInc;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( f );
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
