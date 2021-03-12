# Preval test case

# false.md

> Normalize > Templates > Static resolve > Assign > False
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${false}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `${false}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = 'false';
$(x);
`````

## Output

`````js filename=intro
$('false');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
