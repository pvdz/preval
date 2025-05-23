# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)[$("x")] = $(c)[$("y")] = d)) {}
$(f());
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
$(undefined);
$(3, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj$1 = $(c);
const tmpInitAssignLhsComputedProp$1 = $(`y`);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
$(undefined);
$(3, b, c, 3);
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
e[f] = 3;
b[c] = 3;
$( undefined );
$( 3, a, d, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpInitAssignLhsComputedObj = $(b);
    const tmpInitAssignLhsComputedProp = $(`x`);
    const tmpInitAssignLhsComputedObj$1 = $(c);
    const tmpInitAssignLhsComputedProp$1 = $(`y`);
    const tmpInitAssignLhsComputedRhs$1 = d;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
    const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = tmpInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c, d);
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
 - 5: undefined
 - 6: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
