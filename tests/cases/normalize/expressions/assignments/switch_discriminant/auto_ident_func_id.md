# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = function f() {})) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(100);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
$(100);
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( 100 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
