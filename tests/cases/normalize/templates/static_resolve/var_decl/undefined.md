# Preval test case

# undefined.md

> Normalize > Templates > Static resolve > Var decl > Undefined
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${undefined}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = 'undefined';
$(x);
`````

## Output

`````js filename=intro
$('undefined');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same