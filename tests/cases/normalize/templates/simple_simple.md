# Preval test case

# simple_simple.md

> Normalize > Templates > Simple simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ 10 } ${ 20 } def`);
`````

## Pre Normal

`````js filename=intro
$(`abc ${10} ${20} def`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'abc 10 20 def';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('abc 10 20 def');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
