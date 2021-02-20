# Preval test case

# minus_zero.md

> Normalize > Templates > Static resolve > Assign > Minus zero
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${-0}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = `${-0}`;
$(x);
`````

## Output

`````js filename=intro
const SSA_x = `${-0}`;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
