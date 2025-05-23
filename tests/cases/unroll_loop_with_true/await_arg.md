# Preval test case

# await_arg.md

> Unroll loop with true > Await arg
>
>

## Input

`````js filename=intro
async function f() {
  const x = await $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
  $(x);
}
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  const x /*:boolean*/ = await true;
  $(x);
  return undefined;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(async function () {
  $(await true);
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = (await (true));
  $( b );
  return undefined;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = async function () {
  debugger;
  const x = await true;
  $(x);
  return undefined;
};
$(f);
`````


## Todos triggered


- (todo) inline async functions safely (because await)


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
