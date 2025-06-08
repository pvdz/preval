# Preval test case

# ai_rule379b_catch_observable_assign.md

> Ai > Ai3 > Ai rule379b catch observable assign
>
> Globals: $

## Input

`````js filename=intro
// Output:
// log: x_before_try_catch: initial
// log: rethrow_decision: false
// log: x_in_catch_after_decision: modified_in_catch
// log: final_x_value: modified_in_catch

let x = $('log', 'x_before_try_catch: initial');

function throwError() {
    throw new Error("TestError379b");
}

try {
    throwError();
} catch (e) {
    const decision = $('log_and_return', 'rethrow_decision: false', false); // runtime: false
    if (decision) {
        throw e;
    }
    x = $('log', 'x_in_catch_after_decision: modified_in_catch');
}

$('log', `final_x_value: ${x}`);
`````


## Settled


`````js filename=intro
$(`log`, `x_before_try_catch: initial`);
let x /*:unknown*/ = undefined;
try {
  const tmpThrowArg /*:object*/ /*truthy*/ = new Error(`TestError379b`);
  throw tmpThrowArg;
} catch (e) {
  const decision /*:unknown*/ = $(`log_and_return`, `rethrow_decision: false`, false);
  if (decision) {
    throw e;
  } else {
    x = $(`log`, `x_in_catch_after_decision: modified_in_catch`);
  }
}
const tmpBinBothRhs /*:string*/ = $coerce(x, `string`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `final_x_value: ${tmpBinBothRhs}`;
$(`log`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`log`, `x_before_try_catch: initial`);
let x = undefined;
try {
  const tmpThrowArg = new Error(`TestError379b`);
  throw tmpThrowArg;
} catch (e) {
  if ($(`log_and_return`, `rethrow_decision: false`, false)) {
    throw e;
  } else {
    x = $(`log`, `x_in_catch_after_decision: modified_in_catch`);
  }
}
$(`log`, `final_x_value: ${x}`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "log", "x_before_try_catch: initial" );
let a = undefined;
try {
  const b = new Error( "TestError379b" );
  throw b;
}
catch (c) {
  const d = $( "log_and_return", "rethrow_decision: false", false );
  if (d) {
    throw c;
  }
  else {
    a = $( "log", "x_in_catch_after_decision: modified_in_catch" );
  }
}
const e = $coerce( a, "string" );
const f = `final_x_value: ${e}`;
$( "log", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let throwError = function () {
  debugger;
  const tmpThrowArg = new Error(`TestError379b`);
  throw tmpThrowArg;
};
let x = $(`log`, `x_before_try_catch: initial`);
try {
  throwError();
} catch (e) {
  const decision = $(`log_and_return`, `rethrow_decision: false`, false);
  if (decision) {
    throw e;
  } else {
    x = $(`log`, `x_in_catch_after_decision: modified_in_catch`);
  }
}
const tmpBinBothLhs = `final_x_value: `;
const tmpBinBothRhs = $coerce(x, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(`log`, tmpCalleeParam);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'log', 'x_before_try_catch: initial'
 - 2: 'log_and_return', 'rethrow_decision: false', false
 - eval returned: ('<crash[ TestError379b ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
