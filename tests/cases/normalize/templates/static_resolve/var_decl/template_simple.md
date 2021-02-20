# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Var decl > Template simple
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${`I am a string`}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = 'I am a string';
$(x);
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
