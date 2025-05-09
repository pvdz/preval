# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (a = $(b)?.x); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  a = tmpChainElementCall.x;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpChainElementCall$1 /*:unknown*/ = $(b);
    const tmpIfTest$2 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
    } else {
      a = tmpChainElementCall$1.x;
    }
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  a = tmpChainElementCall.x;
}
if (a) {
  while (true) {
    $(1);
    const tmpChainElementCall$1 = $(b);
    if (!(tmpChainElementCall$1 == null)) {
      a = tmpChainElementCall$1.x;
    }
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  a = c.x;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const e = $( b );
    const f = e == null;
    if (f) {

    }
    else {
      a = e.x;
    }
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( a );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '1' }
 - 6: 1
 - 7: { x: '1' }
 - 8: 1
 - 9: { x: '1' }
 - 10: 1
 - 11: { x: '1' }
 - 12: 1
 - 13: { x: '1' }
 - 14: 1
 - 15: { x: '1' }
 - 16: 1
 - 17: { x: '1' }
 - 18: 1
 - 19: { x: '1' }
 - 20: 1
 - 21: { x: '1' }
 - 22: 1
 - 23: { x: '1' }
 - 24: 1
 - 25: { x: '1' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
