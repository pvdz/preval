# Preval test case

# global_group_literal.md

> Normalize > Nullish > Global group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
const y = (1, 2, 3)??foo
$(y);
`````

## Pre Normal


`````js filename=intro
const y = (1, 2, 3) ?? foo;
$(y);
`````

## Normalized


`````js filename=intro
let y = 3;
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = foo;
} else {
}
$(y);
`````

## Output


`````js filename=intro
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
