# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Export > Auto ident func id
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = function f() {};
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
export { a as a };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
let a = f;
export { a };
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
