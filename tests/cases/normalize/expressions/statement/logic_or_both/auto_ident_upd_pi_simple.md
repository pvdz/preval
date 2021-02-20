# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
++b || ++b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b + 1;
let tmpIfTest = b;
if (tmpIfTest) {
} else {
  b = b + 1;
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let SSA_b = 2;
const tmpIfTest = SSA_b;
if (tmpIfTest) {
} else {
  SSA_b = SSA_b + 1;
}
$(a, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
