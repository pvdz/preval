# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Label > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
label: a = typeof $(x);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
label: a = typeof $(x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
$(a, x);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const SSA_a = typeof tmpUnaryArg;
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
