# Preval test case

# num_plus.md

> Spying > Num plus
>
> A spy in a plus

#TODO

## Input

`````js filename=intro
$($spy() + 15);
`````

## Pre Normal

`````js filename=intro
$($spy() + 15);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = $spy();
const tmpCalleeParam = tmpBinLhs + 15;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinLhs = $spy();
const tmpCalleeParam = tmpBinLhs + 15;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
const b = a + 15;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 12360
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
