# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Statement > For of left > Auto ident call computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((1, 2, $(b))[$("$")](1).x of $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCallCompObj /*:unknown*/ = $(b);
    const tmpCallCompProp /*:unknown*/ = $(`\$`);
    const tmpAssignMemLhsObj /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { $: $ };
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpCallCompObj = $(b);
    const tmpCallCompProp = $(`\$`);
    const tmpAssignMemLhsObj = tmpCallCompObj[tmpCallCompProp](1);
    tmpAssignMemLhsObj.x = tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forOf( b );
const d = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = $( "$" );
    const i = g[ h ]( 1 );
    const j = e.value;
    i.x = j;
  }
}
const k = {
  a: 999,
  b: 1000,
};
$( k );
`````


## Todos triggered


- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


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
