# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > For of right > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (let x of (a = b?.c.d.e(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
const tmpClusterSSA_tmpForOfGen /*:unknown*/ = $forOf(tmpChainElementCall);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpClusterSSA_tmpForOfGen.next();
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
const tmpChainElementCall = { e: $ }.e(1);
const tmpClusterSSA_tmpForOfGen = $forOf(tmpChainElementCall);
while (true) {
  const tmpForOfNext = tmpClusterSSA_tmpForOfGen.next();
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
const a = { e: $ };
const b = a.e( 1 );
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
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


- (todo) Calling a static method on an ident that is not global and not recorded in free loop: tmpForOfGen.next
- (todo) Calling a static method on an ident that is not global and not recorded in free loop: tmpClusterSSA_tmpForOfGen.next


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
