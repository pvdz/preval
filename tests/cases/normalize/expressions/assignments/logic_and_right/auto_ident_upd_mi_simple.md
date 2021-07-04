# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(100) && (a = --b));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$($(100) && (a = --b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  b = b - 1;
  let tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  b = 0;
  a = 0;
  $(0);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
