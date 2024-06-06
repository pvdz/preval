# Preval test case

# eq_number_string_spy.md

> Type tracked > Neqeqeq > Eq number string spy
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

#TODO

## Input

`````js filename=intro
const x = 1 * $spy(); // Must be number
const y = '' + $spy(); // Must be string
$(x !== y); // Must be false (number !== bool)
`````

## Pre Normal


`````js filename=intro
const x = 1 * $spy();
const y = `` + $spy();
$(x !== y);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $spy();
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpBinBothLhs$1 = ``;
const tmpBinBothRhs$1 = $spy();
const y = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpCallCallee = $;
const tmpCalleeParam = x !== y;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $spy();
tmpBinBothRhs ** 0;
const tmpBinBothRhs$1 = $spy();
$coerce(tmpBinBothRhs$1, `plustr`);
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
a ** 0;
const b = $spy();
$coerce( b, "plustr" );
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 'Creating spy', 2, 0, ['spy', 12345]
 - 4: '$spy[2].valueOf()'
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
