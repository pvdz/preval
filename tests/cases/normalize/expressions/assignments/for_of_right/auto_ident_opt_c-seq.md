# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > For of right > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = (1, 2, $(b))?.x));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
let tmpForOfGen /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForOfGen = $forOf(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  a = tmpChainElementObject;
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
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainRootProp = $({ x: 1 });
const tmpIfTest = tmpChainRootProp == null;
let tmpForOfGen = undefined;
if (tmpIfTest) {
  tmpForOfGen = $forOf(undefined);
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
  tmpForOfGen = $forOf(tmpChainElementObject);
}
while (true) {
  const tmpForOfNext = tmpForOfGen();
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
  const f = c.x;
  a = f;
  e = $forOf( f );
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
