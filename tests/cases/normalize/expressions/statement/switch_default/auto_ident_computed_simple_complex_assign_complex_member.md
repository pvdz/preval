# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Switch default > Auto ident computed simple complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    b[$("c")] = $(b)[$("d")];
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpAssignComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAssignComMemLhsProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpAssignComputedRhs = tmpCompObj[tmpCalleeParam];
b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
const f = {
  a: 999,
  b: 1000,
};
$( f, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpAssignComMemLhsObj = b;
const tmpAssignComMemLhsProp = $(`c`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpAssignComputedRhs = tmpCompObj[tmpCalleeParam];
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
