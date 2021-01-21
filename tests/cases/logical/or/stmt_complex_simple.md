# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
$(1) || 2;
`````

## Normalized

`````js filename=intro
{
  let tmpLogicStmtOr = $(1);
  if (tmpLogicStmtOr) {
  } else {
    2;
  }
}
`````

## Output

`````js filename=intro
let tmpLogicStmtOr = $(1);
if (tmpLogicStmtOr) {
} else {
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same