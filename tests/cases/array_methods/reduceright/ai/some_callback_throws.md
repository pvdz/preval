# Preval test case

# some_callback_throws.md

> Array methods > Reduceright > Ai > Some callback throws
>
> Test: Array.reduceRight with callback that throws

## Input

`````js filename=intro
const x = [1,2,3].reduceRight(function(x) { $(x); if (x === 2) throw new Error('stop'); });
$(x);
`````


## Settled


`````js filename=intro
$(3);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.reduceRight;
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
const x = $dotCall(tmpMCF, tmpMCOO, `reduceRight`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) objects in isFree check
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
