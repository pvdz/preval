# Preval test case

# string_concat_two.md

> Type tracked > String method > String concat two
>
> String concat should fully resolve

## Input

`````js filename=intro
$('hello'.concat(', ', 'world'));
`````

## Pre Normal

`````js filename=intro
$(`hello`.concat(`, `, `world`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello`.concat(`, `, `world`);
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
