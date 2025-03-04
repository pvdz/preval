# Preval test case

# numstr_stmt.md

> Normalize > Expressions > Numstr stmt
>
> A statement that is a numstr coercion

I guess we have to keep it like this because coercing it to number may force-coerce something that doesn't need to be coerced.

## Input

`````js filename=intro
$spy() + '';
`````

## Pre Normal


`````js filename=intro
$spy() + ``;
`````

## Normalized


`````js filename=intro
const tmpBinLhs = $spy();
$coerce(tmpBinLhs, `plustr`);
`````

## Output


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $spy();
$coerce(tmpBinLhs, `plustr`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
$coerce( a, "plustr" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
