# Preval test case

# ident_regression.md

> normalize > switch > ident_regression
>
> This minimal case was causing the ident in the try to be malformed

Somehow the ident was recorded in the outer block as well as the try-block.

This turned out to be a Tenko bug regarding try-scope tracking.

#TODO

## Input

`````js filename=intro
{
  let AAAAAAAAAAAAAAAAAAAA;
  try {
    AAAAAAAAAAAAAAAAAAAA = false;
  } catch {
    AAAAAAAAAAAAAAAAAAAA = false;
  }
}
`````

## Normalized

`````js filename=intro
{
  let AAAAAAAAAAAAAAAAAAAA;
  try {
    AAAAAAAAAAAAAAAAAAAA = false;
  } catch {
    AAAAAAAAAAAAAAAAAAAA = false;
  }
}
`````

## Output

`````js filename=intro
{
  let AAAAAAAAAAAAAAAAAAAA;
  try {
    AAAAAAAAAAAAAAAAAAAA = false;
  } catch {
    AAAAAAAAAAAAAAAAAAAA = false;
  }
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same