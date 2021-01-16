# Preval test case

# complex_complex.md

> logical > and > complex_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
$(1) && $(2);
`````

## Normalized

`````js filename=intro
{
  let tmpLogicStmtAnd = $(1);
  if (tmpLogicStmtAnd) {
    $(2);
  }
}
`````

## Output

`````js filename=intro
let tmpLogicStmtAnd = $(1);
if (tmpLogicStmtAnd) {
  $(2);
}
`````
