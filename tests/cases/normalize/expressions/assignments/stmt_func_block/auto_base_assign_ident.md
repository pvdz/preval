# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Stmt func block > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = { a: 999, b: 1000 };
    a = b = $(2);
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a, a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = 1;
  let a = { a: 999, b: 1000 };
  const tmpNestedComplexRhs = $(2);
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs, b);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
