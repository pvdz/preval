# Preval test case

# double_var.md

> Normalize > Dupe binds > Double var
>
> Vars can be redeclared many times. Doesn't matter.

#TODO

## Input

`````js filename=intro
var x = $(1);
var x = $(2);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = $(1);
x = $(2);
`````

## Normalized


`````js filename=intro
let x = undefined;
x = $(1);
x = $(2);
`````

## Output


`````js filename=intro
$(1);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
