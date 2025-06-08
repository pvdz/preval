# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = { b: $(1) };
  a.b = 2;
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
const a /*:object*/ /*truthy*/ = { b: 2 };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ b: 2 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { b: 2 };
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  a.b = 2;
  $(a);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: '2' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
