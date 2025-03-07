# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Statement > For c > Auto ident prop s-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); (1, 2, b).c = $(b)[$("d")]);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  b.c = tmpAssignMemRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCompProp$1 /*:unknown*/ = $(`d`);
      const tmpAssignMemRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
      b.c = tmpAssignMemRhs$1;
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  b.c = tmpCompObj[tmpCompProp];
  while (true) {
    if ($(1)) {
      const tmpCompObj$1 = $(b);
      const tmpCompProp$1 = $(`d`);
      b.c = tmpCompObj$1[tmpCompProp$1];
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    (1, 2, b).c = $(b)[$(`d`)];
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignMemLhsObj = b;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
    tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  c: 10,
  d: 20,
};
if (a) {
  const c = $( b );
  const d = $( "d" );
  const e = c[ d ];
  b.c = e;
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( b );
      const h = $( "d" );
      const i = g[ h ];
      b.c = i;
    }
    else {
      break;
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 1
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 1
 - 8: { c: '20', d: '20' }
 - 9: 'd'
 - 10: 1
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 1
 - 17: { c: '20', d: '20' }
 - 18: 'd'
 - 19: 1
 - 20: { c: '20', d: '20' }
 - 21: 'd'
 - 22: 1
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check