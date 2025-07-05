# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident prop simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };

  let a = { a: 999, b: 1000 };
  a = b.c = $(b)[$("d")];
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b.c = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
b.c = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs, b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
$( d, a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.c = tmpNestedPropAssignRhs;
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
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
