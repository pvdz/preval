# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident cond s-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...((10, 20, 30) ? (40, 50, $(60)) : $($(100)))];
$(a);
`````

## Settled


`````js filename=intro
const tmpArrElToSpread /*:unknown*/ = $(60);
[...tmpArrElToSpread];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElToSpread = $(60);
[...tmpArrElToSpread];
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[...((10, 20, 30) ? (40, 50, $(60)) : $($(100)))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpArrElToSpread = $(60);
} else {
  const tmpCalleeParam = $(100);
  tmpArrElToSpread = $(tmpCalleeParam);
}
[...tmpArrElToSpread];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
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
 - 1: 60
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
