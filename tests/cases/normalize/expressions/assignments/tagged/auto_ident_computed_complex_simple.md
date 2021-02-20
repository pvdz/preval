# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = $(b)["c"])} after`;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpCalleeParam = ['before ', ' after'];
const tmpAssignRhsProp = $(b);
const SSA_a = tmpAssignRhsProp.c;
$(tmpCalleeParam, SSA_a);
$(SSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: ['before ', ' after'], 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
