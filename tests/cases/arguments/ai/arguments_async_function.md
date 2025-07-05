# Preval test case

# arguments_async_function.md

> Arguments > Ai > Arguments async function
>
> Test arguments in async function

## Input

`````js filename=intro
async function testArgsAsync() {
  const len = arguments.length;
  const first = arguments[0];
  await Promise.resolve();
  $(len, first);
}
testArgsAsync('async_arg');
`````


## Settled


`````js filename=intro
const testArgsAsync /*:()=>promise*/ = async function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const tmpAwaitArg /*:promise*/ /*truthy*/ = $Promise_resolve();
  await tmpAwaitArg;
  $(1, first);
  return undefined;
};
testArgsAsync(`async_arg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsAsync = async function () {
  const first = arguments[0];
  const tmpAwaitArg = $Promise_resolve();
  await tmpAwaitArg;
  $(1, first);
};
testArgsAsync(`async_arg`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = $Promise_resolve();
  (await (e));
  $( 1, d );
  return undefined;
};
a( "async_arg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsAsync = async function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  const first = tmpPrevalAliasArgumentsAny[0];
  const tmpMCF = $Promise_resolve;
  const tmpAwaitArg = $Promise_resolve();
  await tmpAwaitArg;
  $(len, first);
  return undefined;
};
testArgsAsync(`async_arg`);
`````


## Todos triggered


- (todo) inline async functions safely (because await)
- (todo) type trackeed tricks can possibly support static $Promise_resolve


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
