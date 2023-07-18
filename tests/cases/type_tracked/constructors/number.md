# Preval test case

# number.md

> Type tracked > Constructors > Number
>
> The Number() constructor on a value we know to be bool is a noop

#TODO

## Input

`````js filename=intro
const x = $(5) * $("10");
$(Number(x)); // Is the same as `x` and dropping the `Number` call should not be observable
`````

## Pre Normal

`````js filename=intro
const x = $(5) * $(`10`);
$(Number(x));
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = $(5);
const tmpBinBothRhs = $(`10`);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCallCallee = $;
const tmpStringFirstArg = x;
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(5);
const tmpBinBothRhs = $(`10`);
const x = tmpBinBothLhs * tmpBinBothRhs;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5 );
const b = $( "10" );
const c = a * b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: '10'
 - 3: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
