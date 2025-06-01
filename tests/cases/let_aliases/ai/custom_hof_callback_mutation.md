# Preval test case

# custom_hof_callback_mutation.md

> Let aliases > Ai > Custom hof callback mutation
>
> Mutation in a callback passed to a custom higher-order function (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function runTwice(fn) { fn(); fn(); }
runTwice(() => { x = "changed"; });
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let runTwice = function ($$0) {
  let fn = $$0;
  debugger;
  fn();
  fn();
  return undefined;
};
let x = $(`val`);
const a = x;
const tmpCallCallee = runTwice;
let tmpCalleeParam = function () {
  debugger;
  x = `changed`;
  return undefined;
};
runTwice(tmpCalleeParam);
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
