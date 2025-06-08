# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { x: 1, y: 2, z: 3 })) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
const tmpClusterSSA_a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$({ x: 1, y: 2, z: 3 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
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
    const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
