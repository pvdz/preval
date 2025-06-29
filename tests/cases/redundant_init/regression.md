# Preval test case

# regression.md

> Redundant init > Regression
>
> This crashed. The state looks funky but because we don't normalize after
> every phase2 step, the code can look this way when it gets to the redundantInit
> reducer, which then failed to account for the closure.
> Apparently phase1.1 considered the variable "undefined".

## Options

Repro crash was specific when this reducer was next


- skipEval

## Input

`````js filename=intro
let closure_not_nullable = undefined;
const func = function() {
  debugger;
  const tmp_alias = closure_not_nullable;
  const unknown_index = $(1);
  const should_be_A = tmp_alias[unknown_index];
  return should_be_A;
};
closure_not_nullable = $('PASS');
$(closure_not_nullable);
$(func);
`````


## Settled


`````js filename=intro
const func /*:()=>unknown*/ = function () {
  debugger;
  const unknown_index /*:unknown*/ = $(1);
  const should_be_A /*:unknown*/ = closure_not_nullable[unknown_index];
  return should_be_A;
};
const closure_not_nullable /*:unknown*/ = $(`PASS`);
$(closure_not_nullable);
$(func);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const func = function () {
  const unknown_index = $(1);
  const should_be_A = closure_not_nullable[unknown_index];
  return should_be_A;
};
const closure_not_nullable = $(`PASS`);
$(closure_not_nullable);
$(func);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  const c = d[ b ];
  return c;
};
const d = $( "PASS" );
$( d );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let closure_not_nullable = undefined;
const func = function () {
  debugger;
  const tmp_alias = closure_not_nullable;
  const unknown_index = $(1);
  const should_be_A = tmp_alias[unknown_index];
  return should_be_A;
};
closure_not_nullable = $(`PASS`);
$(closure_not_nullable);
$(func);
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
