# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident func anon
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = function () {};
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(a);
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
const a = function b() {
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
  let a = function () {
    debugger;
    return undefined;
  };
  $(a);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


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
