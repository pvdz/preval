# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > For let > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let xyz = (a = $($)($(1), $(2))); ; $(1)) $(xyz);
$(a);
`````

## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const a /*:unknown*/ = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(a);
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = $($);
const a = tmpCallCallee($(1), $(2));
while (true) {
  $(a);
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let xyz = (a = $($)($(1), $(2)));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( d );
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
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
