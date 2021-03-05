# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Stmt global block > Auto arguments length
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

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
$(a);
`````

## Output

`````js filename=intro
const SSA_a = arguments;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"<$>"', 1: '"<function>"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
