# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = { a: 999, b: 1000 };
  a = b["c"];
  $(a, b);
}
`````

## Pre Normal

`````js filename=intro
{
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  a = b['c'];
  $(a, b);
}
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
a = b.c;
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
$(1, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
