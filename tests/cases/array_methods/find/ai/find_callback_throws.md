# Preval test case

# find_callback_throws.md

> Array methods > Find > Ai > Find callback throws
>
> Test: Array.find with callback that throws

## Input

`````js filename=intro
const x = [1,2,3].find(function(x) { $(x); if (x === 2) throw new Error('stop'); });
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpThrowArg$1 /*:object*/ /*truthy*/ = new $error_constructor(`stop`);
throw tmpThrowArg$1;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpThrowArg$1 = new $error_constructor(`stop`);
throw tmpThrowArg$1;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = new $error_constructor( "stop" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.find;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  const tmpIfTest = x$1 === 2;
  if (tmpIfTest) {
    const tmpThrowArg = new $error_constructor(`stop`);
    throw tmpThrowArg;
  } else {
    return undefined;
  }
};
const x = $dotCall(tmpMCF, tmpMCOO, `find`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement
- (todo) array reads var statement with init CallExpression
- (todo) regular property access of an ident feels tricky;
- (todo) type trackeed tricks can possibly support static $array_find


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ stop ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
