# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = function f() {};
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const f$1 /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(f$1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function $pcompiled() {});
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
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
  let a = { a: 999, b: 1000 };
  const f$1 = function () {
    debugger;
    return undefined;
  };
  a = f$1;
  $(f$1);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


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
