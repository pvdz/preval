# Preval test case

# simple_context.md

> Tofix > simple context
>
> Inlining $dotCall cases when we know what they are actually doing

the context can be inlined easily and safely in this trivial case

## Input

`````js filename=intro
function f() {
  const x = this;
  $(x);
}
f.call({pass: 1});
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
f.call(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
(function () {
  $(this);
}.call({ pass: 1 }));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const x = tmpPrevalAliasThis;
  $(x);
};
f.call({ pass: 1 });
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const x = tmpPrevalAliasThis;
  $(tmpPrevalAliasThis);
  return undefined;
};
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam = { pass: 1 };
$dotCall(tmpCallVal, tmpCallObj, `call`, tmpCalleeParam);
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
a.call( c );
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
