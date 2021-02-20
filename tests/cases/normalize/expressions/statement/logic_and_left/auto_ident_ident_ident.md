# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Logic and left > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
(b = 2) && $(100);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
let tmpIfTest = b;
if (tmpIfTest) {
  $(100);
}
$(a, b, c);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(100);
$(a, 2, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
