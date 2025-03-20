# Preval test case

# func_call.md

> Dot call > Func call
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
function f() {
  const x = this;
  $(x);
}
f.call({pass: 1}, 1, 2, 3, 'yep', $);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  $(tmpPrevalAliasThis);
  return undefined;
};
const tmpCalleeParam /*:object*/ = { pass: 1 };
f.call(tmpCalleeParam, 1, 2, 3, `yep`, $);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(function () {
  $(this);
}.call({ pass: 1 }, 1, 2, 3, `yep`, $));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  $( b );
  return undefined;
};
const c = { pass: 1 };
a.call( c, 1, 2, 3, "yep", $ );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { pass: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
