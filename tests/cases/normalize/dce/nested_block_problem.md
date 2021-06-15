# Preval test case

# nested_block_problem.md

> Normalize > Dce > Nested block problem
>
> Breaks don't need to be toplevel to a case...

This was causing a problem where a double nested block with break would not detect dead code after it.

The problem was that block wasn't propagating the early return to its parent.

#TODO

## Input

`````js filename=intro
x: {
  {
    {
        break x;
    }
  }
  $('eliminate');
}
`````

## Pre Normal

`````js filename=intro
x: {
  {
    {
      break x;
    }
  }
  $(`eliminate`);
}
`````

## Normalized

`````js filename=intro
x: {
  break x;
}
`````

## Output

`````js filename=intro
x: {
  break x;
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
