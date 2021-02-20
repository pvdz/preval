# Preval test case

# null.md

> Normalize > Templates > Static resolve > Arg > Null
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${null}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'null';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('null');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'null'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
