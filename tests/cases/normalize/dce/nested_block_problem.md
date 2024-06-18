# Preval test case

# nested_block_problem.md

> Normalize > Dce > Nested block problem
>
> Breaks don't need to be toplevel to a case...

This was causing a problem where a double nested block with break would not detect dead code after it.

The problem was that block wasn't propagating the early return to its parent.

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

`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
