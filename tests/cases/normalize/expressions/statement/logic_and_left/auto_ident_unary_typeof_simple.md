# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Statement > Logic and left > Auto ident unary typeof simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
typeof arg && $(100);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
typeof arg && $(100);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = typeof arg;
if (tmpIfTest) {
  $(100);
} else {
}
$(a, arg);
`````

## Output


`````js filename=intro
$(100);
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = {
a: 999,
b: 1000
;
$( a, 1 );
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
