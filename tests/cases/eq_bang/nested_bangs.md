# Preval test case

# nested_bangs.md

> Eq bang > Nested bangs
>
> Trying to come up with an example where one change will impact another

## Input

`````js filename=intro
const a = $(1) === $(2);
$(!a);
const b = $(1) === $(2);
$(!b);
$(!a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const a /*:boolean*/ = tmpBinBothLhs !== tmpBinBothRhs;
$(a);
const tmpBinBothLhs$1 /*:unknown*/ = $(1);
const tmpBinBothRhs$1 /*:unknown*/ = $(2);
const b /*:boolean*/ = tmpBinBothLhs$1 !== tmpBinBothRhs$1;
$(b);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1) !== $(2);
$(a);
const tmpBinBothLhs$1 = $(1);
$(tmpBinBothLhs$1 !== $(2));
$(a);
`````

## Pre Normal


`````js filename=intro
const a = $(1) === $(2);
$(!a);
const b = $(1) === $(2);
$(!b);
$(!a);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const a = tmpBinBothLhs === tmpBinBothRhs;
const tmpCalleeParam = !a;
$(tmpCalleeParam);
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const b = tmpBinBothLhs$1 === tmpBinBothRhs$1;
const tmpCalleeParam$1 = !b;
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = !a;
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a !== b;
$( c );
const d = $( 1 );
const e = $( 2 );
const f = d !== e;
$( f );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: 1
 - 5: 2
 - 6: true
 - 7: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
