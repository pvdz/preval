# Preval test case

# ai_rule315_try_cond_opaque_throw_catch.md

> Ai > Ai4 > Ai rule315 try cond opaque throw catch
>
> Test: Opaque conditional in try, opaque throw in then, opaque value caught.

## Input

`````js filename=intro
// Expected: try { if ($('should_throw')) throw $('error_val'); $('no_throw'); } catch (e) { $('caught', e); } $('finally');
try {
  if ($('should_throw')) {
    throw $('error_val');
  } else {
    $('no_throw');
  }
} catch (e) {
  $('caught', e);
}
$('finally');
`````


## Settled


`````js filename=intro
try {
  const tmpIfTest /*:unknown*/ = $(`should_throw`);
  if (tmpIfTest) {
    const tmpThrowArg /*:unknown*/ = $(`error_val`);
    throw tmpThrowArg;
  } else {
    $(`no_throw`);
  }
} catch (e) {
  $(`caught`, e);
}
$(`finally`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  if ($(`should_throw`)) {
    const tmpThrowArg = $(`error_val`);
    throw tmpThrowArg;
  } else {
    $(`no_throw`);
  }
} catch (e) {
  $(`caught`, e);
}
$(`finally`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = $( "should_throw" );
  if (a) {
    const b = $( "error_val" );
    throw b;
  }
  else {
    $( "no_throw" );
  }
}
catch (c) {
  $( "caught", c );
}
$( "finally" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpIfTest = $(`should_throw`);
  if (tmpIfTest) {
    const tmpThrowArg = $(`error_val`);
    throw tmpThrowArg;
  } else {
    $(`no_throw`);
  }
} catch (e) {
  $(`caught`, e);
}
$(`finally`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'should_throw'
 - 2: 'error_val'
 - 3: 'caught', 'error_val'
 - 4: 'finally'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
