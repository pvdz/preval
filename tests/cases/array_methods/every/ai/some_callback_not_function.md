# Preval test case

# some_callback_not_function.md

> Array methods > Every > Ai > Some callback not function
>
> Test: Array.every with non-function callback

## Input

`````js filename=intro
try {
  const x = [1,2].every(null);
  $(x);
} catch (e) {
  $(e instanceof TypeError);
}
`````


## Settled


`````js filename=intro
try {
  const tmpThrowArg /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Attempting to call a value that cannot be called: \`const tmpArrenow = \$dotCall(null, undefined, undefined, tmpArrel, tmpArri, tmpMCOO);\``,
  );
  throw tmpThrowArg;
} catch (e) {
  const tmpCalleeParam /*:boolean*/ = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  const tmpThrowArg = new $typeError_constructor(
    `[Preval] Attempting to call a value that cannot be called: \`const tmpArrenow = \$dotCall(null, undefined, undefined, tmpArrel, tmpArri, tmpMCOO);\``,
  );
  throw tmpThrowArg;
} catch (e) {
  $(e instanceof TypeError);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = new $typeError_constructor( "[Preval] Attempting to call a value that cannot be called: `const tmpArrenow = $dotCall(null, undefined, undefined, tmpArrel, tmpArri, tmpMCOO);`" );
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
  const tmpMCF = tmpMCOO.every;
  const x = $dotCall(tmpMCF, tmpMCOO, `every`, null);
  $(x);
} catch (e) {
  let tmpCalleeParam = e instanceof TypeError;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) can try-escaping support this expr node type? ArrayExpression
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) can try-escaping support this expr node type? Literal
- (todo) can try-escaping support this expr node type? NewExpression
- (todo) first arg to $dotcall should be a reference to a function: Literal
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_every


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
