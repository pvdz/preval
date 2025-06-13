# Preval test case

# ai_rule361_error_statics.md

> Ai > Ai3 > Ai rule361 error statics
>
> Rule 361: Static methods on Error objects

## Input

`````js filename=intro
(function() {
  const e = new Error('my error');
  if (typeof Error.captureStackTrace === 'function') {
    $('captureStackTrace_exists');
    Error.captureStackTrace(e, $('my_func_ref')); // Second arg is function to hide from stack
  } else {
    $('captureStackTrace_absent');
  }
  // V8 specific, might not be present or might be different
  const oldStackLimit = Error.stackTraceLimit;
  $('old_stack_limit', typeof oldStackLimit, oldStackLimit > 0); // log type and if it's a positive number

  Error.stackTraceLimit = $('new_limit', 5);
  $('new_stack_limit_set', Error.stackTraceLimit);

  Error.stackTraceLimit = oldStackLimit; // Restore
  $('restored_stack_limit', Error.stackTraceLimit);
})();
`````


## Settled


`````js filename=intro
const e /*:object*/ /*truthy*/ = new $error_constructor(`my error`);
$(`captureStackTrace_exists`);
const tmpMCP /*:unknown*/ = $(`my_func_ref`);
$dotCall($Error_captureStackTrace, $error_constructor, `captureStackTrace`, e, tmpMCP);
const oldStackLimit /*:unknown*/ = Error.stackTraceLimit;
const tmpCalleeParam$1 /*:boolean*/ = oldStackLimit > 0;
const tmpCalleeParam /*:string*/ /*truthy*/ = typeof oldStackLimit;
$(`old_stack_limit`, tmpCalleeParam, tmpCalleeParam$1);
const tmpAssignMemRhs /*:unknown*/ = $(`new_limit`, 5);
Error.stackTraceLimit = tmpAssignMemRhs;
const tmpCalleeParam$3 /*:unknown*/ = Error.stackTraceLimit;
$(`new_stack_limit_set`, tmpCalleeParam$3);
Error.stackTraceLimit = oldStackLimit;
const tmpCalleeParam$5 /*:unknown*/ = Error.stackTraceLimit;
$(`restored_stack_limit`, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const e = new $error_constructor(`my error`);
$(`captureStackTrace_exists`);
$dotCall($Error_captureStackTrace, $error_constructor, `captureStackTrace`, e, $(`my_func_ref`));
const oldStackLimit = Error.stackTraceLimit;
const tmpCalleeParam$1 = oldStackLimit > 0;
$(`old_stack_limit`, typeof oldStackLimit, tmpCalleeParam$1);
Error.stackTraceLimit = $(`new_limit`, 5);
$(`new_stack_limit_set`, Error.stackTraceLimit);
Error.stackTraceLimit = oldStackLimit;
$(`restored_stack_limit`, Error.stackTraceLimit);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $error_constructor( "my error" );
$( "captureStackTrace_exists" );
const b = $( "my_func_ref" );
$dotCall( $Error_captureStackTrace, $error_constructor, "captureStackTrace", a, b );
const c = Error.stackTraceLimit;
const d = c > 0;
const e = typeof c;
$( "old_stack_limit", e, d );
const f = $( "new_limit", 5 );
Error.stackTraceLimit = f;
const g = Error.stackTraceLimit;
$( "new_stack_limit_set", g );
Error.stackTraceLimit = c;
const h = Error.stackTraceLimit;
$( "restored_stack_limit", h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  const e = new $error_constructor(`my error`);
  const tmpUnaryArg = $Error_captureStackTrace;
  const tmpBinLhs = typeof tmpUnaryArg;
  const tmpIfTest = tmpBinLhs === `function`;
  if (tmpIfTest) {
    $(`captureStackTrace_exists`);
    const tmpMCF = $Error_captureStackTrace;
    const tmpMCP = $(`my_func_ref`);
    $dotCall(tmpMCF, $error_constructor, `captureStackTrace`, e, tmpMCP);
  } else {
    $(`captureStackTrace_absent`);
  }
  const oldStackLimit = Error.stackTraceLimit;
  let tmpCalleeParam = typeof oldStackLimit;
  let tmpCalleeParam$1 = oldStackLimit > 0;
  $(`old_stack_limit`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignMemLhsObj = Error;
  const tmpAssignMemRhs = $(`new_limit`, 5);
  tmpAssignMemLhsObj.stackTraceLimit = tmpAssignMemRhs;
  let tmpCalleeParam$3 = Error.stackTraceLimit;
  $(`new_stack_limit_set`, tmpCalleeParam$3);
  Error.stackTraceLimit = oldStackLimit;
  let tmpCalleeParam$5 = Error.stackTraceLimit;
  $(`restored_stack_limit`, tmpCalleeParam$5);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Error_captureStackTrace


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'captureStackTrace_exists'
 - 2: 'my_func_ref'
 - 3: 'old_stack_limit', 'number', true
 - 4: 'new_limit', 5
 - 5: 'new_stack_limit_set', 'new_limit'
 - 6: 'restored_stack_limit', Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
