# Preval test case

# complex.md

> Regex > Dotcall > Complex
>
> Trying to prevent $dotCall for regex method calls

## Input

`````js filename=intro
const arg = $('give food');
const regex = /foo/;
const f = regex.test;
$dotCall(f, regex, 'test', arg, {some: 'stuff'});
`````

## Pre Normal


`````js filename=intro
const arg = $(`give food`);
const regex = /foo/;
const f = regex.test;
$dotCall(f, regex, `test`, arg, { some: `stuff` });
`````

## Normalized


`````js filename=intro
const arg = $(`give food`);
const regex = /foo/;
const f = $regex_test;
const tmpCallCallee = $dotCall;
const tmpCalleeParam = f;
const tmpCalleeParam$1 = regex;
const tmpCalleeParam$3 = `test`;
const tmpCalleeParam$5 = arg;
const tmpCalleeParam$7 = { some: `stuff` };
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const regex /*:regex*/ = /foo/;
const tmpCalleeParam$7 /*:object*/ = { some: `stuff` };
regex.test(arg, tmpCalleeParam$7);
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
