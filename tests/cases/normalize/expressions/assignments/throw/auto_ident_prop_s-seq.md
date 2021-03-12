# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Throw > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw (a = (1, 2, b).c);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
throw (a = (1, 2, b).c);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsProp = b;
a = tmpAssignRhsProp.c;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const b = { c: 1 };
const SSA_a = b.c;
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
