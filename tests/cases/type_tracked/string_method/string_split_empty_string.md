# Preval test case

# string_split_empty_string.md

> Type tracked > String method > String split empty string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split(''));
`````

## Pre Normal

`````js filename=intro
$(`hello world`.split(``));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello world`.split(``);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`h`, `e`, `l`, `l`, `o`, ` `, `w`, `o`, `r`, `l`, `d`];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
