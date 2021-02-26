# Preval test case

# outer_read_var_write.md

> Assigns > Outer read var write
>
> Turning a var into a const. Or not.

#TODO

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

## Normalized

`````js filename=intro
let x = undefined;
$(x);
$(1);
x = $(2);
$(x, 'b');
`````

## Output

`````js filename=intro
$(undefined);
$(1);
const SSA_x = $(2);
$(SSA_x, 'b');
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

Normalized calls: Same

Final output calls: Same
