# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > Arr spread > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
[...($(b)[$("x")] = $(c)[$("y")] = d + e)];
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
[...7];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $({ x: 1 });
const tmpInitAssignLhsComputedProp = $(`x`);
const tmpInitAssignLhsComputedObj$1 = $({ y: 2 });
const tmpInitAssignLhsComputedProp$1 = $(`y`);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
[...7];
throw `[Preval]: Array spread must crash before this line`;
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
e[f] = 7;
b[c] = 7;
[ ...7 ];
throw "[Preval]: Array spread must crash before this line";
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
