# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function f() {}) && (a = function f() {}));
$(a);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = function () {};
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
