# Preval test case

# auto_computed_simple_simple_simple.md

> Normalize > Expressions > Assignments > For of right > Auto computed simple simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = { b: $(1) }));
a["b"] = 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpForOfGen /*:unknown*/ = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
a.b = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
const tmpForOfGen = $forOf(a);
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
a.b = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
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
b.b = 2;
$( b );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


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
