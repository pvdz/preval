# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = $(b)?.[$("x")]));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpForOfGenNext /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  a = tmpChainElementCall[tmpChainRootComputed];
  tmpForOfGenNext = $forOf(a);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $({ x: 1 });
const tmpIfTest = tmpChainElementCall == null;
let tmpForOfGenNext = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  const tmpChainRootComputed = $(`x`);
  a = tmpChainElementCall[tmpChainRootComputed];
  tmpForOfGenNext = $forOf(a);
}
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
let e = undefined;
if (d) {
  e = $forOf( undefined );
}
else {
  const f = $( "x" );
  a = c[ f ];
  e = $forOf( a );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = e();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    g.value;
  }
}
$( a );
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
