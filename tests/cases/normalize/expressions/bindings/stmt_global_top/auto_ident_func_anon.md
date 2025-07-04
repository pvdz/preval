# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident func anon
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = function () {};
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function $pcompiled() {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
