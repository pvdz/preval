# Preval test case

# boolean_true.md

> Type tracked > Constructors > Boolean true
>
> The Boolean() constructor on a value we know to be bool is a noop

#TODO

## Input

`````js filename=intro
const x = $(1) === $(1);
$(Boolean(x)); // Is the same as `x` and dropping the `Boolean` call should not be observable
`````

## Pre Normal

`````js filename=intro
const x = $(1) === $(1);
$(Boolean(x));
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs === tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = Boolean(x);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs === tmpBinBothRhs;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
