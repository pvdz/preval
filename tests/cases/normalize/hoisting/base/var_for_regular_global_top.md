# Preval test case

# var_for_regular_global_top.md

> Normalize > Hoisting > Base > Var for regular global top
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
$(x);
for (var x = 10;false;);
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
$(x);
{
  x = 10;
  while (false) {}
}
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
$(x);
x = 10;
$(x);
`````

## Output

`````js filename=intro
$(undefined);
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
