# Preval test case

# string_replace_string_string.md

> Type tracked > String method > String replace string string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.replace(' ', ', '));
`````

## Pre Normal

`````js filename=intro
$(`hello world`.replace(` `, `, `));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello world`.replace(` `, `, `);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`hello, world`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "hello, world" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'hello, world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
