# Preval test case

# some_callback_throws.md

> Array methods > Some > Ai > Some callback throws
>
> Test: Array.some with callback that throws

## Input

`````js filename=intro
const x = [1,2,3].some(function(x) { $(x); if (x === 2) throw new Error('stop'); });
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
const tmpMCF = tmpMCOO.some;
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
const x = $dotCall(tmpMCF, tmpMCOO, `some`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_some


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
