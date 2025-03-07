# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = [1, 2, 3];
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = [1, 2, 3];
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = [1, 2, 3];
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
