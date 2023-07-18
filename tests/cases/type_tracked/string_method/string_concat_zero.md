# Preval test case

# string_concat_zero.md

> Type tracked > String method > String concat zero
>
> String concat should fully resolve

## Input

`````js filename=intro
$('hello'.concat());
`````

## Pre Normal

`````js filename=intro
$(`hello`.concat());
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello`.concat();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`hello`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "hello" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
