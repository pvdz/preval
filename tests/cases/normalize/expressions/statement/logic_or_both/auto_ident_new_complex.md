# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
new ($($))(1) || new ($($))(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
new ($($))(1) || new ($($))(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
} else {
  const tmpNewCallee$1 = $($);
  new tmpNewCallee$1(1);
}
$(a);
`````

## Output


`````js filename=intro
const tmpNewCallee = $($);
new tmpNewCallee(1);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
new a( 1 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
