# Preval test case

# unary_arr_strings.md

> Normalize > Binary > With > Arr > Unary arr strings
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  ~ ['a', 'b', 'c'],
  ! ['a', 'b', 'c'],
  - ['a', 'b', 'c'],
  + ['a', 'b', 'c'],
  typeof ['a', 'b', 'c'],
  void ['a', 'b', 'c'],
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [-1, false, NaN, NaN, `object`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, false, NaN, NaN, `object`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, false, NaN, NaN, "object", undefined ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = [`a`, `b`, `c`];
const tmpArrElement = ~tmpUnaryArg;
const tmpUnaryArg$1 = [`a`, `b`, `c`];
const tmpArrElement$1 = !tmpUnaryArg$1;
const tmpUnaryArg$3 = [`a`, `b`, `c`];
const tmpArrElement$3 = -tmpUnaryArg$3;
const tmpUnaryArg$5 = [`a`, `b`, `c`];
const tmpArrElement$5 = +tmpUnaryArg$5;
const tmpUnaryArg$7 = [`a`, `b`, `c`];
const tmpArrElement$7 = typeof tmpUnaryArg$7;
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
 - 1: [-1, false, NaN, NaN, 'object', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
