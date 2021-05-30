# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Stmt global block > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = arguments;
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = arguments;
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
$(a);
`````

## Output

`````js filename=intro
$(arguments);
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: { 0: '"<$>"', 1: '"<function>"', 2: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
