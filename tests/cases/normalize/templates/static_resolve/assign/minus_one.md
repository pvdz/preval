# Preval test case

# minus_one.md

> Normalize > Templates > Static resolve > Assign > Minus one
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${-1}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = `${-1}`;
$(x);
`````

## Output

`````js filename=intro
const SSA_x = `${-1}`;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '-1'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
