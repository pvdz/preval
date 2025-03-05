# Preval test case

# crash.md

> Builtins cases > EncodeURIComponent > Crash
>
> straight from mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

## Input

`````js filename=intro
$(encodeURIComponent("\uD800\uDFFF"));
$(encodeURIComponent("\uD800"));
$(encodeURIComponent("\uDFFF"));
`````

## Pre Normal


`````js filename=intro
$(encodeURIComponent(`\ud800\udfff`));
$(encodeURIComponent(`\ud800`));
$(encodeURIComponent(`\udfff`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = encodeURIComponent(`\ud800\udfff`);
$(tmpCalleeParam);
const tmpCalleeParam$1 = encodeURIComponent(`\ud800`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = encodeURIComponent(`\udfff`);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
$(`%F0%90%8F%BF`);
const tmpCalleeParam$1 /*:string*/ = encodeURIComponent(`\ud800`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:string*/ = encodeURIComponent(`\udfff`);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
$( "%F0%90%8F%BF" );
const a = encodeURIComponent( "\ud800" );
$( a );
const b = encodeURIComponent( "\udfff" );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '%F0%90%8F%BF'
 - eval returned: ('<crash[ URI malformed ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
