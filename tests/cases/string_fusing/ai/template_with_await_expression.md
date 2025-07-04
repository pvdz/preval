# Preval test case

# template_with_await_expression.md

> String fusing > Ai > Template with await expression
>
> Test templates with await expressions that should not be resolved statically

## Input

`````js filename=intro
async function asyncFunc() {
  const value = await Promise.resolve($("async"));
  const template = `async: ${value}`;
  const result = template + "end";
  $(result);
}
asyncFunc();
`````


## Settled


`````js filename=intro
const asyncFunc /*:()=>promise*/ = async function () {
  debugger;
  const tmpMCP /*:unknown*/ = $(`async`);
  const tmpAwaitArg /*:promise*/ /*truthy*/ = $Promise_resolve(tmpMCP);
  const value /*:promise*/ /*truthy*/ = await tmpAwaitArg;
  const tmpBinBothRhs$1 /*:string*/ = $coerce(value, `string`);
  const result /*:string*/ /*truthy*/ = `async: ${tmpBinBothRhs$1}end`;
  $(result);
  return undefined;
};
asyncFunc();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const asyncFunc = async function () {
  const tmpAwaitArg = $Promise_resolve($(`async`));
  $(`async: ${await tmpAwaitArg}end`);
};
asyncFunc();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = $( "async" );
  const c = $Promise_resolve( b );
  const d = (await (c));
  const e = $coerce( d, "string" );
  const f = `async: ${e}end`;
  $( f );
  return undefined;
};
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let asyncFunc = async function () {
  debugger;
  const tmpMCF = $Promise_resolve;
  const tmpMCP = $(`async`);
  const tmpAwaitArg = $dotCall(tmpMCF, Promise, `resolve`, tmpMCP);
  const value = await tmpAwaitArg;
  const tmpBinBothLhs = `async: `;
  const tmpBinBothRhs = $coerce(value, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const template = $coerce(tmpBinLhs, `plustr`);
  const tmpStringConcatR = $coerce(template, `plustr`);
  const result = `${tmpStringConcatR}end`;
  $(result);
  return undefined;
};
asyncFunc();
`````


## Todos triggered


- (todo) inline async functions safely (because await)
- (todo) type trackeed tricks can possibly support static $Promise_resolve


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'async'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
