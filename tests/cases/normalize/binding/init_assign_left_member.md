# Preval test case

# init_assign_left_member.md

> Normalize > Binding > Init assign left member
>
> Should normalize assignment init to separate line

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b = c.x
`````

## Pre Normal


`````js filename=intro
let b = 10;
let c = 20;
let a = (b = c.x);
`````

## Normalized


`````js filename=intro
let b = 10;
let c = 20;
b = c.x;
let a = b;
`````

## Output


`````js filename=intro
(20).x;
`````

## PST Output

With rename=true

`````js filename=intro
20.x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
