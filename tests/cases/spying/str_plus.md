# Preval test case

# str_plus.md

> Spying > Str plus
>
> A spy in a plus

#TODO

## Input

`````js filename=intro
$('' + $spy());
`````

## Pre Normal

`````js filename=intro
$(`` + $spy());
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $spy();
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $spy();
const tmpCalleeParam = $coerce(tmpBinBothRhs, `plustr`);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '12345'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
