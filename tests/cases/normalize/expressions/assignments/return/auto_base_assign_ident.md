# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Return > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = b = $(2));
}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpNestedComplexRhs = $(2);
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  return a;
};
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check
- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
