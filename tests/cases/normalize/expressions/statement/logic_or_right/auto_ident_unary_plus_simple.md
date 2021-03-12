# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Statement > Logic or right > Auto ident unary plus simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(100) || +arg;
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(100) || +arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  +arg;
}
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(100);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
