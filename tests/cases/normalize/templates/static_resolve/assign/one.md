# Preval test case

# one.md

> Normalize > Templates > Static resolve > Assign > One
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${1}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = '1';
$(x);
`````

## Output

`````js filename=intro
$('1');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
