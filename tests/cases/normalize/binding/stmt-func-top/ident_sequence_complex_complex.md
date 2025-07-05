# Preval test case

# ident_sequence_complex_complex.md

> Normalize > Binding > Stmt-func-top > Ident sequence complex complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3;
  let a = ($(b), $(c)).x = $(c);
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
$(2);
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, 2, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
const tmpInitAssignLhsComputedObj = $(3);
const tmpInitAssignLhsComputedRhs = $(3);
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, 2, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
const b = $( 3 );
a.x = b;
$( b, 2, 3 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = 2;
  let c = 3;
  $(b);
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedRhs = $(c);
  tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
  let a = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs, b, c);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
