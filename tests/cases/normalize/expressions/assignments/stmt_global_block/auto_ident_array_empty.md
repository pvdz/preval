# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = [];
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = [];
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
$(a);
`````

## Output

`````js filename=intro
const tmpSSA_a = [];
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
