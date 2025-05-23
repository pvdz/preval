# Preval test case

# id_write2.md

> Normalize > Function > Expr > Id write2
>
> Function recursion by referencing a function expr id

## Options

Assignment to func expr local name will just crash in strict mode.

- skipEval

## Input

`````js filename=intro
const r = function () {
  debugger;
  r = 20;
  return r;
};
const f = r;
const x = f();
const tmpCallCallee = $;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = typeof f;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
$(20, `function`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(20, `function`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 20, "function" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const r = function () {
  debugger;
  r = 20;
  return r;
};
const f = r;
const x = r();
const tmpCallCallee = $;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = typeof f;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
