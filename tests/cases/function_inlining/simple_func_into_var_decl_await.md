# Preval test case

# simple_func_into_var_decl_await.md

> Function inlining > Simple func into var decl await
>
> Attempt to create a case where a simple function is folded while the call is into a var decl.

Make sure `await` doesn't blow up.

## Input

`````js filename=intro
let a = 10;
async function f() {
  a = await 20;
}
const p = f();
const q = f();
$(p, q);
`````


## Settled


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  await 20;
  return undefined;
};
const p /*:promise*/ = f();
const q /*:promise*/ = f();
$(p, q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = async function () {
  await 20;
};
$(f(), f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  (await (20));
  return undefined;
};
const b = a();
const c = a();
$( b, c );
`````


## Todos triggered


- inline async functions safely (because await)


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
