# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Statement > For c > Auto ident new computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); new b[$("$")](1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(`\$`);
  const b /*:object*/ /*truthy*/ = { $: $ };
  const tmpNewCallee /*:unknown*/ = b[tmpCalleeParam];
  new tmpNewCallee(1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
      const tmpNewCallee$1 /*:unknown*/ = b[tmpCalleeParam$1];
      new tmpNewCallee$1(1);
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpCalleeParam = $(`\$`);
  const b = { $: $ };
  const tmpNewCallee = b[tmpCalleeParam];
  new tmpNewCallee(1);
  while (true) {
    if ($(1)) {
      const tmpCalleeParam$1 = $(`\$`);
      const tmpNewCallee$1 = b[tmpCalleeParam$1];
      new tmpNewCallee$1(1);
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
  const b = $( "$" );
  const c = { $: $ };
  const d = c[ b ];
  new d( 1 );
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( "$" );
      const g = c[ f ];
      new g( 1 );
    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCompObj = b;
    const tmpCalleeParam = $(`\$`);
    const tmpNewCallee = tmpCompObj[tmpCalleeParam];
    new tmpNewCallee(1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support NewExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: '$'
 - 6: 1
 - 7: 1
 - 8: '$'
 - 9: 1
 - 10: 1
 - 11: '$'
 - 12: 1
 - 13: 1
 - 14: '$'
 - 15: 1
 - 16: 1
 - 17: '$'
 - 18: 1
 - 19: 1
 - 20: '$'
 - 21: 1
 - 22: 1
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
