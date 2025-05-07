# Preval test case

# unary_infinity.md

> Normalize > Binary > With > Neg infinity > Unary infinity
>
> Deal with certain primitive with unary ops

## Input

`````js filename=intro
const arr = [
  ~ -Infinity,
  ! -Infinity,
  - -Infinity,
  + -Infinity,
  typeof -Infinity,
  void -Infinity,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [-1, false, $Number_POSITIVE_INFINITY, $Number_NEGATIVE_INFINITY, `number`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, false, $Number_POSITIVE_INFINITY, $Number_NEGATIVE_INFINITY, `number`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, false, $Number_POSITIVE_INFINITY, $Number_NEGATIVE_INFINITY, "number", undefined ];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-1, false, Infinity, -Infinity, 'number', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
