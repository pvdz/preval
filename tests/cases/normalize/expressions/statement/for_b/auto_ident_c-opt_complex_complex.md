# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > For b > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(b)?.[$("x")]; $(1));
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  tmpIfTest = tmpChainElementCall[tmpChainRootComputed];
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    let tmpIfTest$2 /*:unknown*/ /*ternaryConst*/ = undefined;
    const tmpChainElementCall$1 /*:unknown*/ = $(b);
    const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
      tmpIfTest$2 = tmpChainElementCall$1[tmpChainRootComputed$1];
    }
    if (tmpIfTest$2) {
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
let tmpIfTest = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  tmpIfTest = tmpChainElementCall[tmpChainRootComputed];
}
if (tmpIfTest) {
  while (true) {
    $(1);
    let tmpIfTest$2 = undefined;
    const tmpChainElementCall$1 = $(b);
    if (!(tmpChainElementCall$1 == null)) {
      const tmpChainRootComputed$1 = $(`x`);
      tmpIfTest$2 = tmpChainElementCall$1[tmpChainRootComputed$1];
    }
    if (!tmpIfTest$2) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
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
    $( 1 );
    let f = undefined;
    const g = $( b );
    const h = g == null;
    if (h) {

    }
    else {
      const i = $( "x" );
      f = g[ i ];
    }
    if (f) {

    }
    else {
      break;
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    tmpIfTest = tmpChainElementObject;
  } else {
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: { x: '1' }
 - 5: 'x'
 - 6: 1
 - 7: { x: '1' }
 - 8: 'x'
 - 9: 1
 - 10: { x: '1' }
 - 11: 'x'
 - 12: 1
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 1
 - 16: { x: '1' }
 - 17: 'x'
 - 18: 1
 - 19: { x: '1' }
 - 20: 'x'
 - 21: 1
 - 22: { x: '1' }
 - 23: 'x'
 - 24: 1
 - 25: { x: '1' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
