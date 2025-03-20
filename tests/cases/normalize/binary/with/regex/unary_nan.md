# Preval test case

# unary_nan.md

> Normalize > Binary > With > Regex > Unary nan
>
> Deal with certain primitive with unary ops

## Input

`````js filename=intro
const arr = [
  ~ /foo/g,
  ! /foo/g,
  - /foo/g,
  + /foo/g,
  typeof /foo/g,
  void /foo/g,
];
$(arr);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:regex*/ = /foo/g;
const tmpArrElement /*:number*/ = ~tmpUnaryArg;
const tmpUnaryArg$3 /*:regex*/ = /foo/g;
const tmpArrElement$3 /*:number*/ = -tmpUnaryArg$3;
const tmpUnaryArg$5 /*:regex*/ = /foo/g;
const tmpArrElement$5 /*:number*/ = +tmpUnaryArg$5;
const arr /*:array*/ = [tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `object`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = /foo/g;
const tmpArrElement = ~tmpUnaryArg;
const tmpUnaryArg$3 = /foo/g;
const tmpArrElement$3 = -tmpUnaryArg$3;
const tmpUnaryArg$5 = /foo/g;
const tmpArrElement$5 = +tmpUnaryArg$5;
$([tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `object`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /foo/g;
const b = ~a;
const c = /foo/g;
const d = -c;
const e = /foo/g;
const f = +e;
const g = [ b, false, d, f, "object", undefined ];
$( g );
`````


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
