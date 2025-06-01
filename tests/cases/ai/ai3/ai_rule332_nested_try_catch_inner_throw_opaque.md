# Preval test case

# ai_rule332_nested_try_catch_inner_throw_opaque.md

> Ai > Ai3 > Ai rule332 nested try catch inner throw opaque
>
> Test: Nested try...catch; inner catch throws opaque, outer catch handles.

## Input

`````js filename=intro
// Expected: try { try { throw $('err1'); } catch(e1) { $('caught_inner', e1); throw $('err2'); } } catch(e2) { $('caught_outer', e2); }
try {
  try {
    $('in_try1');
    throw $('err1');
  } catch (e1) {
    $('caught_inner', e1);
    throw $('err2');
  }
} catch (e2) {
  $('caught_outer', e2);
}
$('done');
`````


## Settled


`````js filename=intro
try {
  $(`in_try1`);
  const tmpThrowArg /*:unknown*/ = $(`err1`);
  throw tmpThrowArg;
} catch (e1) {
  try {
    $(`caught_inner`, e1);
    const tmpThrowArg$1 /*:unknown*/ = $(`err2`);
    throw tmpThrowArg$1;
  } catch (e2) {
    $(`caught_outer`, e2);
  }
}
$(`done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`in_try1`);
  const tmpThrowArg = $(`err1`);
  throw tmpThrowArg;
} catch (e1) {
  try {
    $(`caught_inner`, e1);
    const tmpThrowArg$1 = $(`err2`);
    throw tmpThrowArg$1;
  } catch (e2) {
    $(`caught_outer`, e2);
  }
}
$(`done`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "in_try1" );
  const a = $( "err1" );
  throw a;
}
catch (b) {
  try {
    $( "caught_inner", b );
    const c = $( "err2" );
    throw c;
  }
  catch (d) {
    $( "caught_outer", d );
  }
}
$( "done" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  $(`in_try1`);
  const tmpThrowArg = $(`err1`);
  throw tmpThrowArg;
} catch (e1) {
  try {
    $(`caught_inner`, e1);
    const tmpThrowArg$1 = $(`err2`);
    throw tmpThrowArg$1;
  } catch (e2) {
    $(`caught_outer`, e2);
  }
}
$(`done`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'in_try1'
 - 2: 'err1'
 - 3: 'caught_inner', 'err1'
 - 4: 'err2'
 - 5: 'caught_outer', 'err2'
 - 6: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
