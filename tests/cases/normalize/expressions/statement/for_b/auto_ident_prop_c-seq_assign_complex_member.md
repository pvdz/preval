# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Statement > For b > Auto ident prop c-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; ((1, 2, $(b)).c = $(b)[$("d")]); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCompProp$1 /*:unknown*/ = $(`d`);
    const varInitAssignLhsComputedRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
    varInitAssignLhsComputedObj$1.c = varInitAssignLhsComputedRhs$1;
    if (varInitAssignLhsComputedRhs$1) {
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
const b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while (true) {
    $(1);
    const varInitAssignLhsComputedObj$1 = $(b);
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`d`);
    const varInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
    varInitAssignLhsComputedObj$1.c = varInitAssignLhsComputedRhs$1;
    if (!varInitAssignLhsComputedRhs$1) {
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
  while (((1, 2, $(b)).c = $(b)[$(`d`)])) {
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  const tmpIfTest = varInitAssignLhsComputedRhs;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const f = $( a );
    const g = $( a );
    const h = $( "d" );
    const i = g[ h ];
    f.c = i;
    if (i) {

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
$( j, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 1
 - 5: { c: '20', d: '20' }
 - 6: { c: '20', d: '20' }
 - 7: 'd'
 - 8: 1
 - 9: { c: '20', d: '20' }
 - 10: { c: '20', d: '20' }
 - 11: 'd'
 - 12: 1
 - 13: { c: '20', d: '20' }
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 1
 - 17: { c: '20', d: '20' }
 - 18: { c: '20', d: '20' }
 - 19: 'd'
 - 20: 1
 - 21: { c: '20', d: '20' }
 - 22: { c: '20', d: '20' }
 - 23: 'd'
 - 24: 1
 - 25: { c: '20', d: '20' }
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
