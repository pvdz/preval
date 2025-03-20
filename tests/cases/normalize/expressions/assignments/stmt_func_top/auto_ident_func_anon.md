# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = function () {};
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {});
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
