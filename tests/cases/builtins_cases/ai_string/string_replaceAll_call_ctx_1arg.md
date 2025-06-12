# Preval test case

# string_replaceAll_call_ctx_1arg.md

> Builtins cases > Ai string > String replaceAll call ctx 1arg
>
> Test String.prototype.replaceAll called with .call and 1 argument (pattern only), using a context value; should throw TypeError

## Input

`````js filename=intro
const ctx = $("world");
try {
  String.prototype.replaceAll.call(ctx, "o");
} catch (e) {
  $(e instanceof TypeError);
  // Expected: true
}
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
try {
  $dotCall($string_replaceAll, ctx, undefined, `o`);
} catch (e) {
  const tmpCalleeParam /*:boolean*/ = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ctx = $(`world`);
try {
  $dotCall($string_replaceAll, ctx, undefined, `o`);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
try {
  $dotCall( $string_replaceAll, a, undefined, "o" );
}
catch (b) {
  const c = b instanceof TypeError;
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
try {
  const tmpCompObj = $String_prototype;
  const tmpMCOO = tmpCompObj.replaceAll;
  const tmpMCF = tmpMCOO.call;
  $dotCall(tmpMCF, tmpMCOO, `call`, ctx, `o`);
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) try escaping may support dotcalling $string_replaceAll
- (todo) type trackeed tricks can possibly support static $string_replaceAll


## Globals


BAD@! Found 1 implicit global bindings:

TypeError


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
