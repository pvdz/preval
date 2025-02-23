# Preval test case

# outer_read_var_write.md

> Assigns > Outer read var write
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
$(x);
{
  var x;
  $(1);
  x = $(2); // Ideally the first read would become undefined and then this becomes a constant
  $(x, 'b');
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(x);
{
  $(1);
  x = $(2);
  $(x, `b`);
}
`````

## Normalized


`````js filename=intro
let x = undefined;
$(x);
$(1);
x = $(2);
$(x, `b`);
`````

## Output


`````js filename=intro
$(undefined);
$(1);
const x /*:unknown*/ = $(2);
$(x, `b`);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( 1 );
const a = $( 2 );
$( a, "b" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 1
 - 3: 2
 - 4: 2, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
