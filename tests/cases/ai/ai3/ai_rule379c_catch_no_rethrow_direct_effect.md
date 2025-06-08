# Preval test case

# ai_rule379c_catch_no_rethrow_direct_effect.md

> Ai > Ai3 > Ai rule379c catch no rethrow direct effect
>
> Globals: $

## Input

`````js filename=intro
// Output:
// log: rethrow_c_decision: false
// log: effect_in_catch: 123
// log: done: finished

try {
    throw new Error("TestError379c");
} catch (e) {
    const decision = $('log_and_return', 'rethrow_c_decision: false', false); // runtime: false
    if (decision) {
        throw e;
    }
    $('log', 'effect_in_catch: 123');
}

$('log', 'done: finished');
`````


## Settled


`````js filename=intro
try {
  const tmpThrowArg /*:object*/ /*truthy*/ = new Error(`TestError379c`);
  throw tmpThrowArg;
} catch (e) {
  const decision /*:unknown*/ = $(`log_and_return`, `rethrow_c_decision: false`, false);
  if (decision) {
    throw e;
  } else {
    $(`log`, `effect_in_catch: 123`);
  }
}
$(`log`, `done: finished`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  const tmpThrowArg = new Error(`TestError379c`);
  throw tmpThrowArg;
} catch (e) {
  if ($(`log_and_return`, `rethrow_c_decision: false`, false)) {
    throw e;
  } else {
    $(`log`, `effect_in_catch: 123`);
  }
}
$(`log`, `done: finished`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = new Error( "TestError379c" );
  throw a;
}
catch (b) {
  const c = $( "log_and_return", "rethrow_c_decision: false", false );
  if (c) {
    throw b;
  }
  else {
    $( "log", "effect_in_catch: 123" );
  }
}
$( "log", "done: finished" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpThrowArg = new Error(`TestError379c`);
  throw tmpThrowArg;
} catch (e) {
  const decision = $(`log_and_return`, `rethrow_c_decision: false`, false);
  if (decision) {
    throw e;
  } else {
    $(`log`, `effect_in_catch: 123`);
  }
}
$(`log`, `done: finished`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'log_and_return', 'rethrow_c_decision: false', false
 - eval returned: ('<crash[ TestError379c ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
