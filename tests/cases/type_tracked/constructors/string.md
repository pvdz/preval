# Preval test case

# string.md

> Type tracked > Constructors > String
>
> The String() constructor on a value we know to be bool is a noop

#TODO

## Input

`````js filename=intro
const x = "" + $(1);
$(String(x)); // Is the same as `x` and dropping the `String` call should not be observable
`````

## Pre Normal

`````js filename=intro
const x = '' + $(1);
$(String(x));
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = '';
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = String(x);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = '' + tmpBinBothRhs;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
