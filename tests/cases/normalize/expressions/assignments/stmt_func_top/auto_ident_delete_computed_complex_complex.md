# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let arg = { y: 1 };

  let a = { a: 999, b: 1000 };
  a = delete $(arg)[$("y")];
  $(a, arg);
}
$(f());
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(a, arg);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
$(delete tmpDeleteCompObj[tmpDeleteCompProp], arg);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
$( d, a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let arg = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: true, {}
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
