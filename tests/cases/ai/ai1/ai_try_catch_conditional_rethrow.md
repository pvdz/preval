# Preval test case

# ai_try_catch_conditional_rethrow.md

> Ai > Ai1 > Ai try catch conditional rethrow
>
> Test: try-catch with conditional re-throw in catch block.

## Input

`````js filename=intro
// Expected: const $$0 = $('err1'); try { throw $$0; } catch (e) { $('caught_it'); const $$1 = $('cond_rethrow'); if ($$1) { throw e; } } $('after');
try {
  throw $('err1');
} catch (e) {
  $('caught_it');
  if ($('cond_rethrow')) {
    throw e;
  }
}
$('after');
`````


## Settled


`````js filename=intro
try {
  const tmpThrowArg /*:unknown*/ = $(`err1`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught_it`);
  const tmpIfTest /*:unknown*/ = $(`cond_rethrow`);
  if (tmpIfTest) {
    throw e;
  } else {
  }
}
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  const tmpThrowArg = $(`err1`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught_it`);
  if ($(`cond_rethrow`)) {
    throw e;
  }
}
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = $( "err1" );
  throw a;
}
catch (b) {
  $( "caught_it" );
  const c = $( "cond_rethrow" );
  if (c) {
    throw b;
  }
}
$( "after" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpThrowArg = $(`err1`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught_it`);
  const tmpIfTest = $(`cond_rethrow`);
  if (tmpIfTest) {
    throw e;
  } else {
  }
}
$(`after`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'err1'
 - 2: 'caught_it'
 - 3: 'cond_rethrow'
 - eval returned: ('<crash[ err1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
