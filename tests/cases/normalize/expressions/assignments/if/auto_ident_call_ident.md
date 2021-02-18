# Preval test case

# auto_ident_call_ident.md

> normalize > expressions > assignments > if > auto_ident_call_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(1);
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
const SSA_a = $(1);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
