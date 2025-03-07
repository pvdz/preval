# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = { x: 1, y: 2, z: 3 };
    $(a);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 1, y: 2, z: 3 });
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { x: 1, y: 2, z: 3 };
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { x: 1, y: 2, z: 3 };
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
