# Preval test case

# nested_bangs.md

> Eq bang > Nested bangs
>
> Trying to come up with an example where one change will impact another

#TODO

## Input

`````js filename=intro
const a = $(1) === $(2);
$(!a);
const b = $(1) === $(2);
$(!b);
$(!a);
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
const tmpCallCallee = $;
const tmpCalleeParam = !a;
tmpCallCallee(tmpCalleeParam);
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const b = tmpBinBothLhs$1 === tmpBinBothRhs$1;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = !b;
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = !a;
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const a = tmpBinBothLhs !== tmpBinBothRhs;
$(a);
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const b = tmpBinBothLhs$1 !== tmpBinBothRhs$1;
$(b);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
