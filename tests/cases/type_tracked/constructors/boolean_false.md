# Preval test case

# boolean_false.md

> Type tracked > Constructors > Boolean false
>
> The Boolean() constructor on a value we know to be bool is a noop

#TODO

## Input

`````js filename=intro
const x = $(1) === $(2);
$(Boolean(x)); // Is the same as `x` and dropping the `Boolean` call should not be observable
`````

## Pre Normal


`````js filename=intro
const x = $(1) === $(2);
$(Boolean(x));
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs === tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = Boolean(x);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs === tmpBinBothRhs;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
