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
$(encodeURIComponent(`𐏿`));
$(encodeURIComponent(`�`));
$(encodeURIComponent(`�`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = encodeURIComponent(`𐏿`);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = encodeURIComponent(`�`);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = encodeURIComponent(`�`);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
$(`%F0%90%8F%BF`);
const tmpCalleeParam$1 = encodeURIComponent(`�`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = encodeURIComponent(`�`);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
$( "%F0%90%8F%BF" );
const a = encodeURIComponent( "�" );
$( a );
const b = encodeURIComponent( "�" );
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
