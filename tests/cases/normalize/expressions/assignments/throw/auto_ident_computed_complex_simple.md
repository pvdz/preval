# Preval test case

# auto_ident_computed_complex_simple.md

> normalize > expressions > assignments > throw > auto_ident_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw (a = $(b)["c"]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
const SSA_a = tmpAssignRhsProp.c;
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
