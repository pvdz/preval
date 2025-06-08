# Preval test case

# method_call_mutation.md

> Let aliases > Ai > Method call mutation
>
> Mutation in a method call (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function mutate() { this.x = "changed"; }
mutate.call({ x });
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const mutate /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ /*truthy*/ = this;
  debugger;
  tmpPrevalAliasThis.x = `changed`;
  return undefined;
};
const x /*:unknown*/ = $(`val`);
const tmpMCP /*:object*/ /*truthy*/ = { x: x };
$dotCall($function_call, mutate, `call`, tmpMCP);
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const mutate = function () {
  const tmpPrevalAliasThis = this;
  tmpPrevalAliasThis.x = `changed`;
};
const x = $(`val`);
$dotCall($function_call, mutate, `call`, { x: x });
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  b.x = "changed";
  return undefined;
};
const c = $( "val" );
const d = { x: c };
$dotCall( $function_call, a, "call", d );
$( c, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let mutate = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  tmpPrevalAliasThis.x = `changed`;
  return undefined;
};
let x = $(`val`);
const a = x;
const tmpMCF = mutate.call;
const tmpMCP = { x: x };
$dotCall(tmpMCF, mutate, `call`, tmpMCP);
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
