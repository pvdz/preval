# Preval test case

# complex.md

> normalize > templates > complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ 10 } def`;
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['abc ', ' def'];
const tmpCalleeParam$1 = 10;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['abc ', ' def'];
tmpCallCallee(tmpCalleeParam, 10);
`````

## Result

Should call `$` with:
 - 1: ['abc ', ' def'], 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
