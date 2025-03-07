# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Statement > For b > Auto ident computed complex complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; ($(b)[$("c")] = $(b)[$("d")]); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
    const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`c`);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCompProp$1 /*:unknown*/ = $(`d`);
    const varInitAssignLhsComputedRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
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
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while (true) {
    $(1);
    const varInitAssignLhsComputedObj$1 = $(b);
    const varInitAssignLhsComputedProp$1 = $(`c`);
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`d`);
    const varInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
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
  while (($(b)[$(`c`)] = $(b)[$(`d`)])) {
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
  const varInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
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
const c = $( "c" );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
b[c] = f;
if (f) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const g = $( a );
    const h = $( "c" );
    const i = $( a );
    const j = $( "d" );
    const k = i[ j ];
    g[h] = k;
    if (k) {

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
$( l, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 1
 - 6: { c: '20', d: '20' }
 - 7: 'c'
 - 8: { c: '20', d: '20' }
 - 9: 'd'
 - 10: 1
 - 11: { c: '20', d: '20' }
 - 12: 'c'
 - 13: { c: '20', d: '20' }
 - 14: 'd'
 - 15: 1
 - 16: { c: '20', d: '20' }
 - 17: 'c'
 - 18: { c: '20', d: '20' }
 - 19: 'd'
 - 20: 1
 - 21: { c: '20', d: '20' }
 - 22: 'c'
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