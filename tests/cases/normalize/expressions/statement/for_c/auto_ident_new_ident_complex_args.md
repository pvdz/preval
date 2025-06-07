# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > For c > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); new $($(1), $(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  new $(tmpCalleeParam, tmpCalleeParam$1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      const tmpCalleeParam$4 /*:unknown*/ = $(2);
      new $(tmpCalleeParam$2, tmpCalleeParam$4);
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new $(tmpCalleeParam, tmpCalleeParam$1);
  while (true) {
    if ($(1)) {
      const tmpCalleeParam$2 = $(1);
      const tmpCalleeParam$4 = $(2);
      new $(tmpCalleeParam$2, tmpCalleeParam$4);
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = $( 2 );
  new $( b, c );
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = $( 1 );
      const f = $( 2 );
      new $( e, f );
    }
    else {
      break;
    }
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNewCallee = $;
    let tmpCalleeParam = $(1);
    let tmpCalleeParam$1 = $(2);
    new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support NewExpression as expression statement in free loops?
- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 1, 2
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 1, 2
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
