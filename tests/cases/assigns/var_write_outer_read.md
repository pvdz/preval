# Preval test case

# var_write_outer_read.md

> Assigns > Var write outer read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
{
  var x;
  $(1);
  x = $(2); // This should become a constant because the block will get eliminated
  $(x, 'b');
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
{
  $(1);
  x = $(2);
  $(x, `b`);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
$(1);
x = $(2);
$(x, `b`);
$(x);
`````

## Output


`````js filename=intro
$(1);
const x = $(2);
$(x, `b`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "b" );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'b'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
