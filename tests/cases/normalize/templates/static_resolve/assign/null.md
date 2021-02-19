# Preval test case

# null.md

> normalize > templates > static_resolve > assign > null
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${null}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = 'null';
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
