# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ((1, 2, b).c = 2);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : ((1, 2, b).c = 2);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.c = 2;
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b.c = 2;
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
