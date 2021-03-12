# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Statement > Logic or left > Auto ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
b || $(100);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b || $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
if (b) {
} else {
  $(100);
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
