# Preval test case

# string_with_meta_property.md

> String fusing > Ai > String with meta property
>
> Test string concatenation with meta properties

## Options

We don't guarantee function.name so we shouldn't support this either unless forced to

- skipEval

## Input

`````js filename=intro
const result = "function: " + (function(){}).constructor.name;
$(result);
`````


## Settled


`````js filename=intro
$(`function: constructor`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function: constructor`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function: constructor" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = `function: `;
const tmpCompObj$1 = function () {
  debugger;
  return undefined;
};
const tmpCompObj = tmpCompObj$1.constructor;
const tmpBinBothRhs = tmpCompObj.name;
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
