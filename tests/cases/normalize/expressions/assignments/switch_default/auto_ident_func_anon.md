# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Switch default > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = function () {};
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(function () {});
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = function() {
  debugger;
  return undefined;
};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
