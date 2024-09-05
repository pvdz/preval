# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Ternary c > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  $(1);
  $(2);
  const tmpDeleteObj = arg;
  delete tmpDeleteObj.y;
}
$(a, arg);
`````

## Output


`````js filename=intro
const tmpIfTest = $(0);
const arg = { y: 1 };
if (tmpIfTest) {
  $(100);
} else {
  $(1);
  $(2);
  delete arg.y;
}
const a = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = { y: 1 };
if (a) {
  $( 100 );
}
else {
  $( 1 );
  $( 2 );
  delete b.y;
}
const c = {
  a: 999,
  b: 1000,
};
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
