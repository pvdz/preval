# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    a = (1, 2, b).c;
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 1 };
$(1, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, { c: 1 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
$( 1, a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpAssignRhsProp = b;
  a = tmpAssignRhsProp.c;
  $(a, b);
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
 - 1: 1, { c: '1' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
