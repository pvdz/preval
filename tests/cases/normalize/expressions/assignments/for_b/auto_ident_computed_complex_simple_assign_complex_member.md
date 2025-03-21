# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > For b > Auto ident computed complex simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; (a = $(b)["c"] = $(b)[$("d")]); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpNestedAssignObj$1 /*:unknown*/ = $(b);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCompProp$1 /*:unknown*/ = $(`d`);
    const tmpNestedAssignPropRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
    tmpNestedAssignObj$1.c = tmpNestedAssignPropRhs$1;
    a = tmpNestedAssignPropRhs$1;
    if (tmpNestedAssignPropRhs$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignPropRhs, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  while (true) {
    $(1);
    const tmpNestedAssignObj$1 = $(b);
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`d`);
    const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
    tmpNestedAssignObj$1.c = tmpNestedAssignPropRhs$1;
    a = tmpNestedAssignPropRhs$1;
    if (!tmpNestedAssignPropRhs$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignPropRhs, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while ((a = $(b)[`c`] = $(b)[$(`d`)])) {
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
  const tmpNestedAssignObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpIfTest = a;
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
let a = undefined;
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( b );
const e = $( "d" );
const f = d[ e ];
c.c = f;
if (f) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const g = $( b );
    const h = $( b );
    const i = $( "d" );
    const j = h[ i ];
    g.c = j;
    a = j;
    if (j) {

    }
    else {
      break;
    }
  }
  $( a, b );
}
else {
  $( f, b );
}
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
