# Preval test case

# plus_str.md

> Spying > Plus str
>
> A spy in a plus

## Input

`````js filename=intro
$($spy() + '');
`````

## Pre Normal


`````js filename=intro
$($spy() + ``);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = $spy();
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinLhs = $spy();
const tmpCalleeParam /*:string*/ = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "plustr" );
$( b );
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
