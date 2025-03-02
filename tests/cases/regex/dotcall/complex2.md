# Preval test case

# complex2.md

> Regex > Dotcall > Complex2
>
> Trying to prevent $dotCall for regex method calls

## Input

`````js filename=intro
const arg = $(`give food`);
const f = $regex_test;
const regex /*:regex*/ = /foo/;
const tmpCalleeParam$5 /*:object*/ = { some: `stuff` };
$dotCall(f, regex, 'test', arg, tmpCalleeParam$5);
`````

## Pre Normal


`````js filename=intro
const arg = $(`give food`);
const f = $regex_test;
const regex = /foo/;
const tmpCalleeParam$5 = { some: `stuff` };
$dotCall(f, regex, `test`, arg, tmpCalleeParam$5);
`````

## Normalized


`````js filename=intro
const arg = $(`give food`);
const f = $regex_test;
const regex = /foo/;
const tmpCalleeParam$5 = { some: `stuff` };
$dotCall(f, regex, `test`, arg, tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const regex /*:regex*/ = /foo/;
const tmpCalleeParam$5 /*:object*/ = { some: `stuff` };
regex.test(arg, tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "give food" );
const b = /foo/;
const c = { some: "stuff" };
b.test( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'give food'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
