# Preval test case

# concat.md

> base > concat
>
> Simple string concat

## Input

`````js filename=intro
$('a' + 'b')
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'ab';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('ab');
`````

## Result

Should call `$` with:
 - 1: 'ab'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
