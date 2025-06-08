# Preval test case

# returned_fn_bound_then_called.md

> Let aliases > Ai > Returned fn bound then called
>
> Returned function bound and called (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function makeMutator() {
  return function() { x = "changed"; };
}
const mutator = makeMutator().bind(null);
mutator();
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpClusterSSA_tmpMCOO /*:()=>undefined*/ = function () {
  debugger;
  x = `changed`;
  return undefined;
};
const mutator /*:function*/ /*truthy*/ = $dotCall($function_bind, tmpClusterSSA_tmpMCOO, `bind`, null);
mutator();
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
const mutator = $dotCall(
  $function_bind,
  function () {
    x = `changed`;
  },
  `bind`,
  null,
);
mutator();
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = function() {
  debugger;
  a = "changed";
  return undefined;
};
const d = $dotCall( $function_bind, c, "bind", null );
d();
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let makeMutator = function () {
  debugger;
  const tmpReturnArg = function () {
    debugger;
    x = `changed`;
    return undefined;
  };
  return tmpReturnArg;
};
let x = $(`val`);
const a = x;
const tmpMCOO = makeMutator();
const tmpMCF = tmpMCOO.bind;
const mutator = $dotCall(tmpMCF, tmpMCOO, `bind`, null);
mutator();
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_bind
- (todo) type trackeed tricks can possibly support static $function_bind


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
