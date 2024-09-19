# Preval test case

# simple.md

> Regex > Dotcall > Simple
>
> Trying to prevent $dotCall for regex method calls

## Input

`````js filename=intro
const arg = $('give food');
$(/foo/.test(arg));
`````

## Pre Normal


`````js filename=intro
const arg = $(`give food`);
$(/foo/.test(arg));
`````

## Normalized


`````js filename=intro
const arg = $(`give food`);
const tmpCallCallee = $;
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(arg);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const arg = $(`give food`);
const tmpCallObj /*:regex*/ = /foo/;
const tmpCalleeParam = tmpCallObj.test(arg);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "give food" );
const b = /foo/;
const c = b.test( a );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'give food'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
