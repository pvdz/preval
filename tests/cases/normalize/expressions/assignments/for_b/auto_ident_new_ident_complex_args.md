# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > For b > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new $($(1), $(2))); $(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const tmpCalleeParam$2 /*:unknown*/ = $(1);
  const tmpCalleeParam$4 /*:unknown*/ = $(2);
  new $(tmpCalleeParam$2, tmpCalleeParam$4);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
while (true) {
  $(1);
  const tmpCalleeParam$2 = $(1);
  const tmpCalleeParam$4 = $(2);
  new $(tmpCalleeParam$2, tmpCalleeParam$4);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ((a = new $($(1), $(2)))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
const a = $( 1 );
const b = $( 2 );
new $( a, b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const c = $( 1 );
  const d = $( 2 );
  new $( c, d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Support this node type in isFree: NewExpression