# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Let > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = function f() {});
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
$(f);
$(f);
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
