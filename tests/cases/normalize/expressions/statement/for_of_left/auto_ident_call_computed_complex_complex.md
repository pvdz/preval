# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > For of left > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ($(b)[$("$")](1).x of $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpMCCO /*:unknown*/ = $(b);
    const tmpMCCP /*:unknown*/ = $(`\$`);
    const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
    const tmpAssignMemLhsObj$1 /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
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
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpMCCO = $(b);
    const tmpMCCP = $(`\$`);
    const tmpAssignMemLhsObj$1 = tmpMCCO[tmpMCCP](1);
    tmpAssignMemLhsObj$1.x = tmpForOfNext.value;
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
  const e = c();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = $( "$" );
    const i = g[ h ];
    const j = $dotCall( i, g, undefined, 1 );
    const k = e.value;
    j.x = k;
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````


## Todos triggered


- (todo) objects in isFree check


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
