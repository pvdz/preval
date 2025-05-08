# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > For c > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); delete arg[$("y")]);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteCompProp /*:unknown*/ = $(`y`);
  delete arg[tmpDeleteCompProp];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
      delete arg[tmpDeleteCompProp$1];
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteCompProp = $(`y`);
  delete arg[tmpDeleteCompProp];
  while (true) {
    if ($(1)) {
      const tmpDeleteCompProp$1 = $(`y`);
      delete arg[tmpDeleteCompProp$1];
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { y: 1 };
if (a) {
  const c = $( "y" );
  delete b[ c ];
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = $( "y" );
      delete b[ e ];
    }
    else {
      break;
    }
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f, b );
`````


## Todos triggered


- (todo) do we want to support UnaryExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'y'
 - 3: 1
 - 4: 'y'
 - 5: 1
 - 6: 'y'
 - 7: 1
 - 8: 'y'
 - 9: 1
 - 10: 'y'
 - 11: 1
 - 12: 'y'
 - 13: 1
 - 14: 'y'
 - 15: 1
 - 16: 'y'
 - 17: 1
 - 18: 'y'
 - 19: 1
 - 20: 'y'
 - 21: 1
 - 22: 'y'
 - 23: 1
 - 24: 'y'
 - 25: 1
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
