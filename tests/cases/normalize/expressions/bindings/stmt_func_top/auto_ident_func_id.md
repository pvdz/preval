# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident func id
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = function f() {};
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const f$1 /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f$1);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const f$1 = function () {
    debugger;
    return undefined;
  };
  let a = f$1;
  $(f$1);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


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
