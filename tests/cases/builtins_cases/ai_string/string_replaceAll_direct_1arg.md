# Preval test case

# string_replaceAll_direct_1arg.md

> Builtins cases > Ai string > String replaceAll direct 1arg
>
> Test String.prototype.replaceAll called directly with 1 argument (pattern only); should throw TypeError

## Input

`````js filename=intro
const str = $("hello");
try {
  str.replaceAll("l");
} catch (e) {
  $(e instanceof TypeError);
  // Expected: true
}
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
try {
  const tmpMCF /*:unknown*/ = str.replaceAll;
  $dotCall(tmpMCF, str, `replaceAll`, `l`);
} catch (e) {
  const tmpCalleeParam /*:boolean*/ = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
try {
  str.replaceAll(`l`);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
try {
  const b = a.replaceAll;
  $dotCall( b, a, "replaceAll", "l" );
}
catch (c) {
  const d = c instanceof TypeError;
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
try {
  const tmpMCF = str.replaceAll;
  $dotCall(tmpMCF, str, `replaceAll`, `l`);
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? MemberExpression


## Globals


BAD@! Found 1 implicit global bindings:

TypeError


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
