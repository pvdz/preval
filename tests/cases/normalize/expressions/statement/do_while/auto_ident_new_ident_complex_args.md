# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > Do while > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (new $($(1), $(2)));
$(a);
`````

## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  new $(tmpCalleeParam, tmpCalleeParam$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(100);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new $(tmpCalleeParam, tmpCalleeParam$1);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (new $($(1), $(2))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const a = $( 1 );
  const b = $( 2 );
  new $( a, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 1, 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 1, 2
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
