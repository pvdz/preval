# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : $(b)["c"];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $(b)[`c`];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpCompObj = $(b);
  tmpCompObj.c;
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpCompObj = $(b);
  tmpCompObj.c;
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( 0 );
if (c) {
  $( 100 );
}
else {
  const d = $( a );
  d.c;
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { c: '1' }
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
