# Preval test case

# global_block.md

> normalize > hoisting > global_block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
$(x);
{
  for (var x = 10;false;);
}
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
{
  {
    x = 10;
  }
}
$(x);
`````

## Output

`````js filename=intro
var x;
$(x);
{
  {
    x = 10;
  }
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
