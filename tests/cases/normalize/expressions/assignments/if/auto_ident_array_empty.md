# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > If > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = []));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
const SSA_a = [];
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
