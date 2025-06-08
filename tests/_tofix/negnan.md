# Preval test case

# negnan.md

> Tofix > negnan
>
> Deal with certain primitive with unary ops

negative nan is still nan.

## Input

`````js filename=intro
const arr = [
  ~ NaN,
  ! NaN,
  - NaN,
  + NaN,
  typeof NaN,
  void NaN,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [-1, true, -NaN, NaN, `number`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, true, -NaN, NaN, `number`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, true, -NaN, NaN, "number", undefined ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = -1;
const tmpArrElement$1 = true;
const tmpArrElement$3 = -NaN;
const tmpArrElement$5 = NaN;
const tmpArrElement$7 = `number`;
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
 - 1: [-1, true, NaN, NaN, 'number', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
