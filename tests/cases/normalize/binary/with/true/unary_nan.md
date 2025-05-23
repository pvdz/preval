# Preval test case

# unary_nan.md

> Normalize > Binary > With > True > Unary nan
>
> Deal with certain primitive with unary ops

## Input

`````js filename=intro
const arr = [
  ~ true,
  ! true,
  - true,
  + true,
  typeof true,
  void true,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [-2, false, -1, 1, `boolean`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-2, false, -1, 1, `boolean`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -2, false, -1, 1, "boolean", undefined ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = -2;
const tmpArrElement$1 = false;
const tmpArrElement$3 = -1;
const tmpArrElement$5 = 1;
const tmpArrElement$7 = `boolean`;
const tmpArrElement$9 = undefined;
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
$(arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-2, false, -1, 1, 'boolean', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
