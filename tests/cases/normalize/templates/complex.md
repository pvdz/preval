# Preval test case

# complex.md

> normalize > templates > complex
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ 10 } def`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `abc ${10} def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `abc ${10} def`;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'abc 10 def'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
