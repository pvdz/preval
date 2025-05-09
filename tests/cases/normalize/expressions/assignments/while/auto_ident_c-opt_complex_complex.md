# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((a = $(b)?.[$("x")])) $(100);
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
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  a = tmpChainElementCall[tmpChainRootComputed];
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementCall$1 /*:unknown*/ = $(b);
    const tmpIfTest$2 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
    } else {
      const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
      a = tmpChainElementCall$1[tmpChainRootComputed$1];
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
  const tmpChainRootComputed = $(`x`);
  a = tmpChainElementCall[tmpChainRootComputed];
}
if (a) {
  while (true) {
    $(100);
    const tmpChainElementCall$1 = $(b);
    if (!(tmpChainElementCall$1 == null)) {
      const tmpChainRootComputed$1 = $(`x`);
      a = tmpChainElementCall$1[tmpChainRootComputed$1];
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
  const e = $( "x" );
  a = c[ e ];
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( b );
    const g = f == null;
    if (g) {

    }
    else {
      const h = $( "x" );
      a = f[ h ];
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
 - 2: 'x'
 - 3: 100
 - 4: { x: '1' }
 - 5: 'x'
 - 6: 100
 - 7: { x: '1' }
 - 8: 'x'
 - 9: 100
 - 10: { x: '1' }
 - 11: 'x'
 - 12: 100
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 100
 - 16: { x: '1' }
 - 17: 'x'
 - 18: 100
 - 19: { x: '1' }
 - 20: 'x'
 - 21: 100
 - 22: { x: '1' }
 - 23: 'x'
 - 24: 100
 - 25: { x: '1' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
