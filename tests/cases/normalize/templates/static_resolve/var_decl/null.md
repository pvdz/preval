# Preval test case

# null.md

> Normalize > Templates > Static resolve > Var decl > Null
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${null}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = 'null';
$(x);
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
