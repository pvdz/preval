# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto pattern obj complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let { a } = $({ a: 1, b: 2 });
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpBindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const a /*:unknown*/ = tmpBindingPatternObjRoot.a;
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($({ a: 1, b: 2 }).a);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
$( c );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = { a: 1, b: 2 };
  let tmpBindingPatternObjRoot = $(tmpCalleeParam);
  let a = tmpBindingPatternObjRoot.a;
  $(a);
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
 - 1: { a: '1', b: '2' }
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
