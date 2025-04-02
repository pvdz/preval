# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
for (let x of (a = b?.c(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
const tmpClusterSSA_tmpForOfGen /*:unknown*/ = $forOf(tmpChainElementCall);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpClusterSSA_tmpForOfGen();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(tmpChainElementCall);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = { c: $ }.c(1);
const tmpClusterSSA_tmpForOfGen = $forOf(tmpChainElementCall);
while (true) {
  const tmpForOfNext = tmpClusterSSA_tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(tmpChainElementCall);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = a.c( 1 );
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    d.value;
  }
}
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
