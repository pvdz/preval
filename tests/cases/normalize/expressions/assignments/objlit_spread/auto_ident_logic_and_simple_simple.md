# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = 1 && 2) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = 1 && 2) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 1;
if (a) {
  a = 2;
}
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = 1;
if (SSA_a) {
  SSA_a = 2;
}
const tmpObjSpread = SSA_a;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
