# Preval test case

# collapsable.md

> Dot call > Collapsable
>
> This can be collapsed safely because the regex decl could not possibly affect
> str, meaning the .replace method is still available by the time it gets called.

## Input

`````js filename=intro
const str = $('hello');
const method = str.replace;
const regex = /e/g;
const out = $dotCall(method, str, regex, `u`);
$(out);
`````

## Pre Normal


`````js filename=intro
const str = $(`hello`);
const method = str.replace;
const regex = /e/g;
const out = $dotCall(method, str, regex, `u`);
$(out);
`````

## Normalized


`````js filename=intro
const str = $(`hello`);
const method = str.replace;
const regex = /e/g;
const out = $dotCall(method, str, regex, `u`);
$(out);
`````

## Output


`````js filename=intro
const str = $(`hello`);
const regex /*:regex*/ = /e/g;
const out = str.replace(regex, `u`);
$(out);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "hello" );
const b = /e/g;
const c = a.replace( b, "u" );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'hello'
 - 2: 'hullo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
