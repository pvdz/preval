# Preval test case

# array_map2.md

> Dot call > Array map2
>
> Undo the "damage" done by dot call when we can detect it not to be necessary. We assert that $dotCall used to be a method call before so if the args are safe to inline, we can undo this step now. It was necessary for safe normalization purposes.

## Input

`````js filename=intro
const f = function(item) {
  $('hello', item);
  return item + 1;
};
const arr = [1, 2, 3].map(f);
$(arr);
`````


## Settled


`````js filename=intro
$(`hello`, 1);
$(`hello`, 2);
$(`hello`, 3);
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [2, 3, 4];
$(tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello`, 1);
$(`hello`, 2);
$(`hello`, 3);
$([2, 3, 4]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "hello", 1 );
$( "hello", 2 );
$( "hello", 3 );
const a = [ 2, 3, 4 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let item = $$0;
  debugger;
  $(`hello`, item);
  const tmpReturnArg = item + 1;
  return tmpReturnArg;
};
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.map;
const arr = $dotCall(tmpMCF, tmpMCOO, `map`, f);
$(arr);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello', 1
 - 2: 'hello', 2
 - 3: 'hello', 3
 - 4: [2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
