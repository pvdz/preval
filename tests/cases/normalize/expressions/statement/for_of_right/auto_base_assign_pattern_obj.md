# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > For of right > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (let x of ({ b } = $({ b: $(2) })));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const tmpForOfGenNext /*:unknown*/ = $forOf(tmpNestedAssignObjPatternRhs);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
const tmpForOfGenNext = $forOf(tmpNestedAssignObjPatternRhs);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = e();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    f.value;
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h, d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
