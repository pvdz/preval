# Preval test case

# base_simple.md

> Await > Base simple
>
> The arguments to await should be ok when simple

## Input

`````js filename=intro
async function f() {
  await $;
}
f();
`````


## Settled


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  await $;
  return undefined;
};
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = async function () {
  await $;
};
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  (await ($));
  return undefined;
};
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = async function () {
  debugger;
  await $;
  return undefined;
};
f();
`````


## Todos triggered


- (todo) inline async functions safely (because await)


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
