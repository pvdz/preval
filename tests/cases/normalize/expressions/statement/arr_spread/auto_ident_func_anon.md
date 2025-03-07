# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Statement > Arr spread > Auto ident func anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...function () {}];
$(a);
`````

## Settled


`````js filename=intro
const tmpArrElToSpread /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
[...tmpArrElToSpread];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElToSpread = function () {};
[...tmpArrElToSpread];
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[
  ...function () {
    debugger;
  },
];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElToSpread = function () {
  debugger;
  return undefined;
};
[...tmpArrElToSpread];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
[ ...a ];
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
