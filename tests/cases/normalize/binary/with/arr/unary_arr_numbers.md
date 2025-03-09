# Preval test case

# unary_arr_numbers.md

> Normalize > Binary > With > Arr > Unary arr numbers
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  ~ [10, 20, 30],
  ! [10, 20, 30],
  - [10, 20, 30],
  + [10, 20, 30],
  typeof [10, 20, 30],
  void [10, 20, 30],
];
$(arr);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [`object`, false, NaN, NaN, `object`, undefined];
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`object`, false, NaN, NaN, `object`, undefined]);
`````

## Pre Normal


`````js filename=intro
const arr = [~[10, 20, 30], ![10, 20, 30], -[10, 20, 30], +[10, 20, 30], typeof [10, 20, 30], void [10, 20, 30]];
$(arr);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = [10, 20, 30];
const tmpArrElement = ~tmpUnaryArg;
const tmpUnaryArg$1 = [10, 20, 30];
const tmpArrElement$1 = !tmpUnaryArg$1;
const tmpUnaryArg$3 = [10, 20, 30];
const tmpArrElement$3 = -tmpUnaryArg$3;
const tmpUnaryArg$5 = [10, 20, 30];
const tmpArrElement$5 = +tmpUnaryArg$5;
const tmpUnaryArg$7 = [10, 20, 30];
const tmpArrElement$7 = typeof tmpUnaryArg$7;
const tmpArrElement$9 = undefined;
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "object", false, NaN, NaN, "object", undefined ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [-1, false, NaN, NaN, 'object', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - 1: ['object', false, NaN, NaN, 'object', undefined]
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: ['object', false, NaN, NaN, 'object', undefined]
 - eval returned: undefined
