# Preval test case

# ai_rule315_sequence_throw_opaque.md

> Ai > Ai3 > Ai rule315 sequence throw opaque
>
> Test: Dead code after a throw statement.

## Input

`````js filename=intro
// Expected: try { $('a'); throw $('err'); } catch (e) { $('caught', e); }
// Expected2: try { throw $('err2'); } catch (e) { $('caught2', e); }

try {
  $('a');
  throw $('err');
  $('c_unreachable'); // This should be removed
} catch (e) {
  $('caught', e);
}

try {
  throw $('err2');
  $('d_unreachable'); // This should be removed
} catch (e) {
  $('caught2', e);
}
`````


## Settled


`````js filename=intro
try {
  $(`a`);
  const tmpThrowArg /*:unknown*/ = $(`err`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught`, e);
}
try {
  const tmpThrowArg$1 /*:unknown*/ = $(`err2`);
  throw tmpThrowArg$1;
} catch (e$1) {
  $(`caught2`, e$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`a`);
  const tmpThrowArg = $(`err`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught`, e);
}
try {
  const tmpThrowArg$1 = $(`err2`);
  throw tmpThrowArg$1;
} catch (e$1) {
  $(`caught2`, e$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "a" );
  const a = $( "err" );
  throw a;
}
catch (b) {
  $( "caught", b );
}
try {
  const c = $( "err2" );
  throw c;
}
catch (d) {
  $( "caught2", d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  $(`a`);
  const tmpThrowArg = $(`err`);
  throw tmpThrowArg;
} catch (e) {
  $(`caught`, e);
}
try {
  const tmpThrowArg$1 = $(`err2`);
  throw tmpThrowArg$1;
} catch (e$1) {
  $(`caught2`, e$1);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'err'
 - 3: 'caught', 'err'
 - 4: 'err2'
 - 5: 'caught2', 'err2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
