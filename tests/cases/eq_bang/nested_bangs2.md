# Preval test case

# nested_bangs2.md

> Eq bang > Nested bangs2
>
> Trying to come up with an example where one change will impact another

## Input

`````js filename=intro
const a = $(1) === $(2);
$(!a);
const b = $(1) === $(2);
$(!b);
$(!a);
$(!a);
`````

## Pre Normal


`````js filename=intro
const a = $(1) === $(2);
$(!a);
const b = $(1) === $(2);
$(!b);
$(!a);
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
const tmpCalleeParam$5 = !a;
$(tmpCalleeParam$5);
`````

## Output


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
$(a);
`````

## PST Output

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
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: 1
 - 5: 2
 - 6: true
 - 7: true
 - 8: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
