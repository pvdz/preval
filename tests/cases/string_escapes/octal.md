# Preval test case

# octal.md

> String escapes > Octal
>
> Welcome to the webcompat corner

## Input

`````js filename=intro
$("\13\17\31\08\12\29\21\22\7\16\08\07\09");
`````

## Pre Normal


`````js filename=intro
$(`\u000b\u000f\u0019\u00008
\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009`);
`````

## Normalized


`````js filename=intro
$(`\u000b\u000f\u0019\u00008
\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009`);
`````

## Output


`````js filename=intro
$(`\u000b\u000f\u0019\u00008
\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "\u000b\u000f\u0019\u00008\u000a\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Octal escape sequences are not allowed in strict mode. ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - 1: '\u000b\u000f\u0019\u00008\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009'
 - eval returned: undefined

Final output calls: BAD!!
 - 1: '\u000b\u000f\u0019\u00008\u00029\u0011\u0012\u0007\u000e\u00008\u0007\u00009'
 - eval returned: undefined
