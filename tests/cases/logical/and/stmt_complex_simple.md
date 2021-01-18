# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
$(1) && 2;
`````

## Normalized

`````js filename=intro
{
  let tmpLogicStmtAnd = $(1);
  if (tmpLogicStmtAnd) {
    2;
  }
}
`````

## Output

`````js filename=intro
let tmpLogicStmtAnd = $(1);
if (tmpLogicStmtAnd) {
}
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
