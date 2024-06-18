# Preval test case

# ident_regression.md

> Normalize > Try > Ident regression
>
> This minimal case was causing the ident in the try to be malformed

Somehow the ident was recorded in the outer block as well as the try-block.

This turned out to be a Tenko bug regarding try-scope tracking.

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

## Pre Normal


`````js filename=intro
{
  let AAAAAAAAAAAAAAAAAAAA;
  try {
    AAAAAAAAAAAAAAAAAAAA = false;
  } catch (e) {
    AAAAAAAAAAAAAAAAAAAA = false;
  }
}
`````

## Normalized


`````js filename=intro
let AAAAAAAAAAAAAAAAAAAA = undefined;
try {
  AAAAAAAAAAAAAAAAAAAA = false;
} catch (e) {
  AAAAAAAAAAAAAAAAAAAA = false;
}
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
