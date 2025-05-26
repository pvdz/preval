# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > For b > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, b)[$("c")] = $(b)[$("d")]); $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`c`);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
    const tmpNestedPropAssignRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
    b[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
    if (tmpNestedPropAssignRhs$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedPropAssignRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  let a = undefined;
  while (true) {
    $(1);
    const tmpNestedAssignComMemberProp$1 = $(`c`);
    const tmpCompObj$1 = $(b);
    const tmpCalleeParam$1 = $(`d`);
    const tmpNestedPropAssignRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
    b[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
    if (!tmpNestedPropAssignRhs$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedPropAssignRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
if (e) {
  let f = undefined;
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const g = $( "c" );
    const h = $( b );
    const i = $( "d" );
    const j = h[ i ];
    b[g] = j;
    f = j;
    if (j) {

    }
    else {
      break;
    }
  }
  $( f, b );
}
else {
  $( e, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNestedAssignComMemberObj = b;
  const tmpNestedAssignComMemberProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam];
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
$(a, b);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 1
 - 5: 'c'
 - 6: { c: '20', d: '20' }
 - 7: 'd'
 - 8: 1
 - 9: 'c'
 - 10: { c: '20', d: '20' }
 - 11: 'd'
 - 12: 1
 - 13: 'c'
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 1
 - 17: 'c'
 - 18: { c: '20', d: '20' }
 - 19: 'd'
 - 20: 1
 - 21: 'c'
 - 22: { c: '20', d: '20' }
 - 23: 'd'
 - 24: 1
 - 25: 'c'
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
