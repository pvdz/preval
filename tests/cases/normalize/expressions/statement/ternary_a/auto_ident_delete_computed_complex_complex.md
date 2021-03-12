# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > Ternary a > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete $(arg)[$("y")] ? $(100) : $(200);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete $(arg)[$('y')] ? $(100) : $(200);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: 100
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
