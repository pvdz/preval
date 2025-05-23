# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > For b > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (; (a = $(b)[$("x")] = $(c)[$("y")] = $(d)); $(1));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
let a /*:unknown*/ = tmpInitAssignLhsComputedRhs;
if (tmpInitAssignLhsComputedRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpNestedAssignComMemberObj$1 /*:unknown*/ = $(b);
    const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
    const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
    const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpInitAssignLhsComputedRhs$1;
    a = tmpInitAssignLhsComputedRhs$1;
    if (tmpInitAssignLhsComputedRhs$1) {
    } else {
      break;
    }
  }
  $(a, b, c, 3);
} else {
  $(a, b, c, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj = $(c);
const tmpInitAssignLhsComputedProp = $(`y`);
const tmpInitAssignLhsComputedRhs = $(3);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
let a = tmpInitAssignLhsComputedRhs;
if (tmpInitAssignLhsComputedRhs) {
  while (true) {
    $(1);
    const tmpNestedAssignComMemberObj$1 = $(b);
    const tmpNestedAssignComMemberProp$1 = $(`x`);
    const tmpInitAssignLhsComputedObj$1 = $(c);
    const tmpInitAssignLhsComputedProp$1 = $(`y`);
    const tmpInitAssignLhsComputedRhs$1 = $(3);
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpInitAssignLhsComputedRhs$1;
    a = tmpInitAssignLhsComputedRhs$1;
    if (!tmpInitAssignLhsComputedRhs$1) {
      break;
    }
  }
  $(a, b, c, 3);
} else {
  $(a, b, c, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = { y: 2 };
const e = $( d );
const f = $( "y" );
const g = $( 3 );
e[f] = g;
b[c] = g;
let h = g;
if (g) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const i = $( a );
    const j = $( "x" );
    const k = $( d );
    const l = $( "y" );
    const m = $( 3 );
    k[l] = m;
    i[j] = m;
    h = m;
    if (m) {

    }
    else {
      break;
    }
  }
  $( h, a, d, 3 );
}
else {
  $( h, a, d, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedProp = $(`y`);
  const tmpInitAssignLhsComputedRhs = $(d);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b, c, d);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: 1
 - 7: { x: '3' }
 - 8: 'x'
 - 9: { y: '3' }
 - 10: 'y'
 - 11: 3
 - 12: 1
 - 13: { x: '3' }
 - 14: 'x'
 - 15: { y: '3' }
 - 16: 'y'
 - 17: 3
 - 18: 1
 - 19: { x: '3' }
 - 20: 'x'
 - 21: { y: '3' }
 - 22: 'y'
 - 23: 3
 - 24: 1
 - 25: { x: '3' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
