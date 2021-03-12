# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > If > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = () => {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = () => {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = () => {};
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
const SSA_a = () => {};
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
