# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };

  let a = { a: 999, b: 1000 };
  a = (1, 2, b)[$("c")] = $(b)[$("d")];
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs, b);
$(undefined);
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
$(tmpNestedPropAssignRhs, b);
$(undefined);
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
$( e, b );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignComMemberObj = b;
  const tmpNestedAssignComMemberProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(tmpNestedPropAssignRhs, b);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20, { c: '20', d: '20' }
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
