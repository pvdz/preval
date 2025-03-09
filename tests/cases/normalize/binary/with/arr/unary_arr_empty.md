# Preval test case

# unary_arr_empty.md

> Normalize > Binary > With > Arr > Unary arr empty
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  ~ [],
  ! [],
  - [],
  + [],
  typeof [],
  void [],
];
$(arr);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [-1, false, -0, 0, `object`, undefined];
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, false, -0, 0, `object`, undefined]);
`````

## Pre Normal


`````js filename=intro
const arr = [~[], ![], -[], +[], typeof [], void []];
$(arr);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = [];
const tmpArrElement = ~tmpUnaryArg;
const tmpUnaryArg$1 = [];
const tmpArrElement$1 = !tmpUnaryArg$1;
const tmpUnaryArg$3 = [];
const tmpArrElement$3 = -tmpUnaryArg$3;
const tmpUnaryArg$5 = [];
const tmpArrElement$5 = +tmpUnaryArg$5;
const tmpUnaryArg$7 = [];
const tmpArrElement$7 = typeof tmpUnaryArg$7;
const tmpArrElement$9 = undefined;
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, false, -0, 0, "object", undefined ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [-1, false, 0, 0, 'object', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
