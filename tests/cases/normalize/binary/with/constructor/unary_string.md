# Preval test case

# unary_string.md

> Normalize > Binary > With > Constructor > Unary string
>
> Deal with certain primitive with unary ops

## Input

`````js filename=intro
const arr = [
  ~ String,
  ! String,
  - String,
  + String,
  typeof String,
  void String,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [-1, false, NaN, NaN, `function`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, false, NaN, NaN, `function`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, false, NaN, NaN, "function", undefined ];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-1, false, NaN, NaN, 'function', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
