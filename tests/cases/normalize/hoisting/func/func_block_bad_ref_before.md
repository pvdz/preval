# Preval test case

# func_block_bad_ref_before.md

> Normalize > Hoisting > Func > Func block bad ref before
>
> Block hoisting func decls

It shouldn't hoist the function outside the block.

## Input

`````js filename=intro
function g() {
  f(); // This ought to trigger TDZ (or whatever)...
  {
    function f(){ $(1); }
  }
}
g();
`````


## Settled


`````js filename=intro
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
f();
`````


## PST Settled
With rename=true

`````js filename=intro
f();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
  f();
  let f$1 = function () {
    debugger;
    $(1);
    return undefined;
  };
  return undefined;
};
g();
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

f


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
