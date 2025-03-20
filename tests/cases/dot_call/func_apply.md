# Preval test case

# func_apply.md

> Dot call > Func apply
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
function f() {
  const x = this;
  $(x);
}
f.call({pass: 1}, [1,2,3], 'nope' ,$);
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
const tmpCalleeParam$1 /*:array*/ = [1, 2, 3];
f.call(tmpCalleeParam, tmpCalleeParam$1, `nope`, $);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(function () {
  $(this);
}.call({ pass: 1 }, [1, 2, 3], `nope`, $));
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
const d = [ 1, 2, 3 ];
a.call( c, d, "nope", $ );
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
