# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident obj pattern assign seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let x = 1,
    y = 2;

  let a = ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
  $(a, x, y);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
const tmpNestedAssignObjPatternRhs /*:object*/ /*truthy*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
$({ x: tmpObjLitVal, y: tmpObjLitVal$1 }, tmpObjLitVal, tmpObjLitVal$1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
const c = {
  x: a,
  y: b,
};
$( c, a, b );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let y = 2;
  let a = undefined;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  a = tmpNestedAssignObjPatternRhs;
  $(tmpNestedAssignObjPatternRhs, x, y);
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
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }, 3, 4
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
