# Preval test case

# auto_ident_prop_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
b.c || b.c;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
b.c || b.c;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = b.c;
if (tmpIfTest) {
} else {
  b.c;
}
$(a, b);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const b = { c: 1 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 1 };
$( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
