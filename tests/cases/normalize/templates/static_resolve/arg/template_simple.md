# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Arg > Template simple
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${`I am a string`}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'I am a string';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('I am a string');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'I am a string'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same