# Preval test case

# auto_ident_c-opt_complex_complex3.md

> Normalize > Expressions > Statement > For b > Auto ident c-opt complex complex3
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
while (true) {
  let maybegx = undefined;
  const f = $;
  const g = f(b);
  const same = g != null;
  if (same) {
    const x = $(`x`);
    const gx = g[x];
    maybegx = gx;
  } else {
  }
  if (maybegx) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````


## Settled


`````js filename=intro
let maybegx /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ = { x: 1 };
const g /*:unknown*/ = $(b);
const same /*:boolean*/ = g == null;
if (same) {
} else {
  const x /*:unknown*/ = $(`x`);
  maybegx = g[x];
}
if (maybegx) {
  while ($LOOP_UNROLL_10) {
    $(1);
    let maybegx$1 /*:unknown*/ /*ternaryConst*/ = undefined;
    const g$1 /*:unknown*/ = $(b);
    const same$1 /*:boolean*/ = g$1 == null;
    if (same$1) {
    } else {
      const x$1 /*:unknown*/ = $(`x`);
      maybegx$1 = g$1[x$1];
    }
    if (maybegx$1) {
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
let maybegx = undefined;
const b = { x: 1 };
const g = $(b);
if (!(g == null)) {
  const x = $(`x`);
  maybegx = g[x];
}
if (maybegx) {
  while (true) {
    $(1);
    let maybegx$1 = undefined;
    const g$1 = $(b);
    if (!(g$1 == null)) {
      const x$1 = $(`x`);
      maybegx$1 = g$1[x$1];
    }
    if (!maybegx$1) {
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
