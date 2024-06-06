# Preval test case

# var_global_block.md

> Normalize > Hoisting > Base > Var global block
>
> Hosting in a block should end up in the parent

Should not hoist this because it's an anonymous default export.

There's no point in hoisting it since you can't refer to this function.

#TODO

## Input

`````js filename=intro
$(x);
{
  var x = 10;
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(x);
{
  x = 10;
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
