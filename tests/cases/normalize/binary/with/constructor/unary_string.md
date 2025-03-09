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
const tmpArrElement /*:number*/ = ~String;
const tmpArrElement$3 /*:number*/ = -String;
const tmpArrElement$5 /*:number*/ = +String;
const arr /*:array*/ = [tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `function`, undefined];
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = ~String;
const tmpArrElement$3 = -String;
const tmpArrElement$5 = +String;
$([tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `function`, undefined]);
`````

## Pre Normal


`````js filename=intro
const arr = [~String, !String, -String, +String, typeof String, void String];
$(arr);
`````

## Normalized


`````js filename=intro
const tmpArrElement = ~String;
const tmpArrElement$1 = !String;
const tmpArrElement$3 = -String;
const tmpArrElement$5 = +String;
const tmpArrElement$7 = `function`;
const tmpArrElement$9 = undefined;
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = ~String;
const b = -String;
const c = +String;
const d = [ a, false, b, c, "function", undefined ];
$( d );
`````

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
