# Preval test case

# global_block.md

> normalize > hoisting > global_block
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

## Normalized

`````js filename=intro
var x;
$(x);
{
  x = 10;
}
$(x);
`````

## Output

`````js filename=intro
var x;
$(x);
{
  x = 10;
}
$(x);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same