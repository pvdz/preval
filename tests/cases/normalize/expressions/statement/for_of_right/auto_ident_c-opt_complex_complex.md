# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x of $(b)?.[$("x")]);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpForOfGen /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForOfGen = $forOf(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  tmpForOfGen = $forOf(tmpChainElementObject);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({ x: 1 });
const tmpIfTest = tmpChainElementCall == null;
let tmpForOfGen = undefined;
if (tmpIfTest) {
  tmpForOfGen = $forOf(undefined);
} else {
  const tmpChainRootComputed = $(`x`);
  tmpForOfGen = $forOf(tmpChainElementCall[tmpChainRootComputed]);
}
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
let d = undefined;
if (c) {
  d = $forOf( undefined );
}
else {
  const e = $( "x" );
  const f = b[ e ];
  d = $forOf( f );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = d();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    g.value;
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
