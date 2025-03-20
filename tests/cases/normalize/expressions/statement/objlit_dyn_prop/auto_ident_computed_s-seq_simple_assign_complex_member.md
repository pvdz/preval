# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Objlit dyn prop > Auto ident computed s-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
({ [((1, 2, b)[$("c")] = $(b)[$("d")])]: 10 });
$(a, b);
`````


## Settled


`````js filename=intro
const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpAssignComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignComMemLhsProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$({ a: 999, b: 1000 }, b);
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
const f = {
  a: 999,
  b: 1000,
};
$( f, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
