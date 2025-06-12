# Preval test case

# string_raw_direct_0args.md

> Builtins cases > Ai string > String raw direct 0args
>
> Test String.raw called directly with 0 arguments; should throw TypeError

## Input

`````js filename=intro
try {
  String.raw();
} catch (e) {
  $(e instanceof TypeError);
  // Expected: true
}
`````


## Settled


`````js filename=intro
try {
  $String_raw();
} catch (e) {
  const tmpCalleeParam /*:boolean*/ = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $String_raw();
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $String_raw();
}
catch (a) {
  const b = a instanceof TypeError;
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpMCF = $String_raw;
  $String_raw();
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) try escaping may support calling $String_raw
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


BAD@! Found 1 implicit global bindings:

TypeError


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
