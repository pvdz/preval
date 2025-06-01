# Preval test case

# closure_passed_to_fn_mutation.md

> Let aliases > Ai > Closure passed to fn mutation
>
> Mutation in a closure passed to a function (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function run(fn) { fn(); }
run(() => { x = "changed"; });
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
let run = function ($$0) {
  let fn = $$0;
  debugger;
  fn();
  return undefined;
};
let x = $(`val`);
const a = x;
const tmpCallCallee = run;
let tmpCalleeParam = function () {
  debugger;
  x = `changed`;
  return undefined;
};
run(tmpCalleeParam);
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
