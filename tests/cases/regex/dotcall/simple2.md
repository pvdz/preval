# Preval test case

# simple2.md

> Regex > Dotcall > Simple2
>
> Trying to prevent $dotCall for regex method calls

## Input

`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const tmpCallObj /*:regex*/ = /foo/;
const tmpCalleeParam /*:unknown*/ = tmpCallObj.test(arg);  // <-- this is a bool tho?
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const arg = $(`give food`);
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(arg);
$(tmpCalleeParam);
`````

## Normalized


`````js filename=intro
const arg = $(`give food`);
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(arg);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const tmpCallObj /*:regex*/ = /foo/;
const tmpCalleeParam /*:unknown*/ = tmpCallObj.test(arg);
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
