# Preval test case

# init_assign_right_member.md

> Normalize > Binding > Init assign right member
>
> Should normalize assignment init to separate line

#TODO

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b.x = c
`````

## Pre Normal

`````js filename=intro
let b = 10;
let c = 20;
let a = (b.x = c);
`````

## Normalized

`````js filename=intro
let b = 10;
let c = 20;
const varInitAssignLhsComputedRhs = c;
b.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
`````

## Output

`````js filename=intro
(10).x = 20;
`````

## PST Output

With rename=true

`````js filename=intro
10.x = 20;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot create property 'x' on number '10' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
