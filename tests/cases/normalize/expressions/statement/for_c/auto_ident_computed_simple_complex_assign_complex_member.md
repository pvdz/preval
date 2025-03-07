# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Statement > For c > Auto ident computed simple complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); b[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const tmpAssignComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpAssignComMemLhsProp$1 /*:unknown*/ = $(`c`);
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCompProp$1 /*:unknown*/ = $(`d`);
      const tmpAssignComputedRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
      b[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
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
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  while (true) {
    if ($(1)) {
      const tmpAssignComMemLhsProp$1 = $(`c`);
      const tmpCompObj$1 = $(b);
      const tmpCompProp$1 = $(`d`);
      const tmpAssignComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
      b[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
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
    b[$(`c`)] = $(b)[$(`d`)];
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
    const tmpAssignComMemLhsObj = b;
    const tmpAssignComMemLhsProp = $(`c`);
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
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
  const c = $( "c" );
  const d = $( b );
  const e = $( "d" );
  const f = d[ e ];
  b[c] = f;
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( "c" );
      const i = $( b );
      const j = $( "d" );
      const k = i[ j ];
      b[h] = k;
    }
    else {
      break;
    }
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 1
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 1
 - 10: 'c'
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: 'c'
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 1
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: 'c'
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check