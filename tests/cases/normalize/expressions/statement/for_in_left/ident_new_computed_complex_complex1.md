# Preval test case

# ident_new_computed_complex_complex1.md

> Normalize > Expressions > Statement > For in left > Ident new computed complex complex1
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (new ($(1)[2])(3).x in b);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpForInGen /*:unknown*/ = $forIn(b);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCompObj /*:unknown*/ = $(1);
    const tmpNewCallee /*:unknown*/ = tmpCompObj[2];
    const tmpAssignMemLhsObj /*:object*/ = new tmpNewCallee(3);
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ $: $ });
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpNewCallee = $(1)[2];
    const tmpAssignMemLhsObj = new tmpNewCallee(3);
    tmpAssignMemLhsObj.x = tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn(b);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      new ($(1)[2])(3).x = tmpForInNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpForInGen = $forIn(b);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCompObj = $(1);
    const tmpNewCallee = tmpCompObj[2];
    const tmpAssignMemLhsObj = new tmpNewCallee(3);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = $( 1 );
    const f = e[ 2 ];
    const g = new f( 3 );
    const h = c.value;
    g.x = h;
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
