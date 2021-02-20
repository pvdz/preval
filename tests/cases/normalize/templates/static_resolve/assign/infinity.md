# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Assign > Infinity
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${Infinity}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = 'Infinity';
$(x);
`````

## Output

`````js filename=intro
$('Infinity');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Infinity'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
