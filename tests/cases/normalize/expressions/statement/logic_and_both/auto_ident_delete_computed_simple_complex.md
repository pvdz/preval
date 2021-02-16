# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > statement > logic_and_both > auto_ident_delete_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete arg[$("y")] && delete arg[$("y")];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  const tmpDeleteCompObj$1 = arg;
  const tmpDeleteCompProp$1 = $('y');
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpDeleteCompProp = $('y');
const tmpIfTest = delete arg[tmpDeleteCompProp];
if (tmpIfTest) {
  const tmpDeleteCompProp$1 = $('y');
  delete arg[tmpDeleteCompProp$1];
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
