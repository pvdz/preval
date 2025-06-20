# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Stmt func top > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = {};

  let a = { a: 999, b: 1000 };
  ({ b } = $({ b: $(2) }));
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const b /*:unknown*/ = tmpAssignObjPatternRhs.b;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const b = $({ b: tmpObjLitVal }).b;
$({ a: 999, b: 1000 }, b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = {
  a: 999,
  b: 1000,
};
$( e, d );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = {};
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(2);
  let tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
  $(a, b);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { a: '999', b: '1000' }, 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
