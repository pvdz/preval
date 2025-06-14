# Preval test case

# reduce_some_callback_not_function.md

> Array methods > Reduce > Ai > Reduce some callback not function
>
> Test: Array.reduce with non-function callback

## Input

`````js filename=intro
try {
  const x = [1,2].reduce(null);
  $(x);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## Settled


`````js filename=intro
try {
  const tmpThrowArg$1 /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Attempting to call a value that cannot be called: \`tmpArreout = \$dotCall(null, undefined, undefined, tmpArreout, tmpArrel, tmpArri, tmpMCOO);\``,
  );
  throw tmpThrowArg$1;
} catch (e) {
  const tmpCalleeParam /*:boolean*/ = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  const tmpThrowArg$1 = new $typeError_constructor(
    `[Preval] Attempting to call a value that cannot be called: \`tmpArreout = \$dotCall(null, undefined, undefined, tmpArreout, tmpArrel, tmpArri, tmpMCOO);\``,
  );
  throw tmpThrowArg$1;
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = new $typeError_constructor( "[Preval] Attempting to call a value that cannot be called: `tmpArreout = $dotCall(null, undefined, undefined, tmpArreout, tmpArrel, tmpArri, tmpMCOO);`" );
  throw a;
}
catch (b) {
  const c = b instanceof TypeError;
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpMCOO = [1, 2];
  const tmpMCF = tmpMCOO.reduce;
  const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, null);
  $(x);
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) can try-escaping support this expr node type? ArrayExpression
- (todo) can try-escaping support this expr node type? Literal
- (todo) can try-escaping support this expr node type? NewExpression
- (todo) can try-escaping support this expr node type? ObjectExpression
- (todo) first arg to $dotcall should be a reference to a function: Literal
- (todo) objects in isFree check
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


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
