# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b[$("c")]);
}
$(f());
$(a, b);
`````

## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpClusterSSA_a /*:unknown*/ = b[tmpAssignRhsCompProp];
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
const tmpClusterSSA_a = b[tmpAssignRhsCompProp];
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = b[$(`c`)]);
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  return a;
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( c );
$( c, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'c'
 - 2: 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
