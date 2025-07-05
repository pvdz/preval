# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Return > Auto ident computed complex simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
function f() {
  return ($(b)["c"] = $(b)[$("d")]);
}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
$({ a: 999, b: 1000 }, b);
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
$( e );
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
  tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
  return tmpInitAssignLhsComputedRhs;
};
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a, b);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
