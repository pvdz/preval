# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Statement > For let > Auto ident computed simple complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (let xyz = (b[$("c")] = $(b)[$("d")]); ; $(1)) $(xyz);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpInitAssignLhsComputedRhs);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
while (true) {
  $(tmpInitAssignLhsComputedRhs);
  $(1);
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( e );
  $( 1 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 1
 - 6: 20
 - 7: 1
 - 8: 20
 - 9: 1
 - 10: 20
 - 11: 1
 - 12: 20
 - 13: 1
 - 14: 20
 - 15: 1
 - 16: 20
 - 17: 1
 - 18: 20
 - 19: 1
 - 20: 20
 - 21: 1
 - 22: 20
 - 23: 1
 - 24: 20
 - 25: 1
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
