# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > For c > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); $($)($(1), $(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCallComplexCallee /*:unknown*/ = $($);
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpCallComplexCallee(tmpCalleeParam, tmpCalleeParam$1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCallComplexCallee$1 /*:unknown*/ = $($);
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      const tmpCalleeParam$4 /*:unknown*/ = $(2);
      tmpCallComplexCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
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
  const tmpCallComplexCallee = $($);
  tmpCallComplexCallee($(1), $(2));
  while (true) {
    if ($(1)) {
      const tmpCallComplexCallee$1 = $($);
      tmpCallComplexCallee$1($(1), $(2));
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
  const b = $( $ );
  const c = $( 1 );
  const d = $( 2 );
  b( c, d );
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( $ );
      const g = $( 1 );
      const h = $( 2 );
      f( g, h );
    }
    else {
      break;
    }
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCallComplexCallee = $($);
    const tmpCallCallee = tmpCallComplexCallee;
    let tmpCalleeParam = $(1);
    let tmpCalleeParam$1 = $(2);
    tmpCallComplexCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 1
 - 7: '<$>'
 - 8: 1
 - 9: 2
 - 10: 1, 2
 - 11: 1
 - 12: '<$>'
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 2
 - 25: 1, 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
